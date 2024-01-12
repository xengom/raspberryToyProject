const puppeteer = require('puppeteer-core');

module.exports = () => {
  return {
    async openBrowser() {
      return await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    },
    async openPage(browser) {
      return await browser.newPage();
    },
    async accessSite(page, url) {
      return await page.goto(url, { waitUntil: 'networkidle2' });
    },
    async closeBrowser(browser) {
      return await browser.close();
    }
  }
}
