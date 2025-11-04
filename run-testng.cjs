#!/usr/bin/env node
const { spawn } = require('child_process');
const http = require('http');

const DEV_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const MVN_CMD = process.platform === 'win32' ? 'mvn.cmd' : 'mvn';

console.log('Starting Vite dev server...');
const dev = spawn(DEV_CMD, ['run', 'dev', '--', '--port', '8080'], { stdio: ['ignore', 'pipe', 'pipe'], shell: true });
dev.stdout.on('data', (d) => process.stdout.write(`[vite] ${d}`));
dev.stderr.on('data', (d) => process.stderr.write(`[vite:error] ${d}`));

function waitForServer(url, timeout = 30000, interval = 500) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      http.get(url, (res) => {
        resolve(url);
      }).on('error', () => {
        if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for dev server'));
        setTimeout(check, interval);
      });
    })();
  });
}

async function findBaseUrl() {
  // try common ports started by vite
  const ports = [8080, 5173, 3000, 8081];
  for (const p of ports) {
    try {
      await waitForServer(`http://localhost:${p}/`, 3000);
      return `http://localhost:${p}`;
    } catch (e) {
      // continue
    }
  }
  // fallback to 8080
  return 'http://localhost:8080';
}

async function run() {
  try {
    const baseUrl = await findBaseUrl();
    console.log('Dev server detected at', baseUrl);

    const mvn = spawn(MVN_CMD, ['-f', 'testng-e2e', 'test'], { stdio: 'inherit', env: { ...process.env, TEST_BASE_URL: baseUrl } });
    mvn.on('exit', (code) => {
      try { if (dev && !dev.killed) dev.kill(); } catch (e) {}
      process.exit(code || 0);
    });
    mvn.on('error', (err) => {
      console.error('Failed to run mvn test:', err);
      try { if (dev && !dev.killed) dev.kill(); } catch (e) {}
      process.exit(1);
    });
  } catch (e) {
    console.error('Runner failed:', e);
    try { if (dev && !dev.killed) dev.kill(); } catch (er) {}
    process.exit(1);
  }
}

run();
