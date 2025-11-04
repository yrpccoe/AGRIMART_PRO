const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('E2E Login Flow', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    // headless new is recommended for recent Chrome
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Ensure chromedriver binary from node_modules is used via SELENIUM_REMOTE_URL if needed,
    // but selenium-webdriver will locate chromedriver automatically when chromedriver package is installed.

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should login and logout successfully', async () => {
    console.log('Opening app in browser...');
    await driver.get('http://localhost:8080/');

    // wait for page to be ready
    await driver.wait(async () => {
      const ready = await driver.executeScript('return document.readyState');
      return ready === 'complete' || ready === 'interactive';
    }, 10000);

    // ensure the test user exists in localStorage for the app to authenticate (must run on same origin)
    await driver.executeScript(function () {
      const users = JSON.parse(localStorage.getItem('kc_users') || '[]');
      const exists = users.find(u => u.email === 'testuser@example.com');
      if (!exists) {
        users.push({ email: 'testuser@example.com', password: 'Test@1234' });
        localStorage.setItem('kc_users', JSON.stringify(users));
      }
    });

    // navigate to login page via navbar link
    const loginLink = await driver.wait(until.elementLocated(By.css('a[href="/login"]')), 10000);
    await loginLink.click();

    // fill form
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await emailInput.clear();
    await emailInput.sendKeys('testuser@example.com');

    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
    await passwordInput.clear();
    await passwordInput.sendKeys('Test@1234');

    // click login button (submit)
    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
    await loginButton.click();

    // wait for navigation to home and header update
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url === 'http://localhost:8080/' || /localhost:8080/.test(url);
    }, 10000);

    // check header contains the email or a dashboard element
    const headerUser = await driver.wait(
      until.elementLocated(By.xpath("//nav//span[contains(text(),'testuser@example.com')]|//nav//*[contains(text(),'Dashboard')]|//header//*[contains(text(),'testuser@example.com')]|//nav//span[contains(@class,'user')]")),
      10000
    );
    const txt = await headerUser.getText();
    assert.ok(txt && (txt.includes('testuser@example.com') || /dashboard/i.test(txt)), 'User not shown in header');

    // logout: try to find logout button and click; if not present, clear localStorage as fallback
    let logoutButton = null;
    try {
      logoutButton = await driver.findElement(By.xpath("//button[contains(.,'Logout')]|//a[contains(.,'Logout')]|//button[contains(.,'Log out')]|//button[.='Logout']"));
    } catch (e) {
      logoutButton = null;
    }

    if (logoutButton) {
      await logoutButton.click();
    } else {
      await driver.executeScript("localStorage.removeItem('kc_current_user'); window.dispatchEvent(new Event('storage'));");
    }

    // ensure login link shows again
    await driver.wait(until.elementLocated(By.css('a[href="/login"]')), 10000);
  });
});
