#!/usr/bin/env node
const { spawn } = require('child_process');
const http = require('http');

const DEV_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const NPX_CMD = process.platform === 'win32' ? 'npx.cmd' : 'npx';

console.log('Starting Vite dev server on port 8080...');
const dev = spawn(DEV_CMD, ['run', 'dev', '--', '--port', '8080'], { stdio: ['ignore', 'pipe', 'pipe'], shell: true });
dev.stdout.on('data', (d) => process.stdout.write(`[vite] ${d}`));
dev.stderr.on('data', (d) => process.stderr.write(`[vite:error] ${d}`));
dev.on('error', (err) => {
  console.error('Failed to start dev server process:', err);
});

function waitForServer(url, timeout = 30000, interval = 500) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      const req = http.get(url, (res) => {
        // any response is good enough
        resolve();
        req.destroy();
      });
      req.on('error', () => {
        const elapsed = Date.now() - start;
        process.stdout.write(`Waiting for dev server... ${Math.floor(elapsed / 1000)}s\r`);
        if (elapsed > timeout) return reject(new Error('Timeout waiting for dev server'));
        setTimeout(check, interval);
      });
    })();
  });
}

async function run() {
  try {
    await waitForServer('http://localhost:8080/', 30000);
    console.log('Dev server ready — starting tests');

    const mocha = spawn(NPX_CMD, ['mocha', '--exit', 'test/e2e/login.test.cjs'], { stdio: 'inherit', shell: true });
    mocha.on('error', (err) => {
      console.error('Failed to start mocha process:', err);
    });

    mocha.on('exit', (code) => {
      // ensure dev server is terminated
      try {
        if (dev && !dev.killed) dev.kill();
      } catch (e) {}
      if (code === 0) {
        console.log('\nE2E RESULT: PASS');
        process.exit(0);
      } else {
        console.log('\nE2E RESULT: FAIL');
        process.exit(code || 1);
      }
    });

    mocha.on('error', (err) => {
      console.error('Failed to start mocha:', err);
      try { dev.kill(); } catch (e) {}
      process.exit(1);
    });
  } catch (e) {
    console.error('E2E setup failed:', e);
    try { if (dev && !dev.killed) dev.kill(); } catch (er) {}
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  try { dev.kill(); } catch (e) {}
  process.exit(130);
});

run();
