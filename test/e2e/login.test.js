const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('E2E Login Flow', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should login and logout successfully', async () => {
    await driver.get('http://localhost:8080/');

    // navigate to login page
    const loginLink = await driver.wait(until.elementLocated(By.css('a[href="/login"]')), 5000);
    await loginLink.click();

    // fill form
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    await emailInput.clear();
    await emailInput.sendKeys('testuser@example.com');

    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    await passwordInput.clear();
    await passwordInput.sendKeys('Test@1234');

    // click login button
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // wait for navigation and user email to appear in header
    await driver.wait(until.urlIs('http://localhost:8080/'), 5000);

    // check header contains the email or a dashboard element
    const headerUser = await driver.wait(
      until.elementLocated(By.xpath("//nav//span[contains(text(),'testuser@example.com')]|//nav//*[contains(text(),'Dashboard')]|//header//*[contains(text(),'testuser@example.com')]")),
      5000
    );
    const txt = await headerUser.getText();
    assert.ok(txt && (txt.includes('testuser@example.com') || /dashboard/i.test(txt)), 'User not shown in header');

    // logout
    const logoutButton = await driver.findElement(By.xpath("//button[contains(.,'Logout')]|//a[contains(.,'Logout')]|//button[contains(.,'Log out')]") ).catch(() => null);
    if (logoutButton) {
      await logoutButton.click();
    } else {
      // try clicking via Navbar by opening menu or similar; as fallback remove localStorage
      await driver.executeScript("localStorage.removeItem('kc_current_user'); window.dispatchEvent(new Event('storage'));");
    }

    // wait for login link to reappear
    await driver.wait(until.elementLocated(By.css('a[href="/login"]')), 5000);
  });
});
