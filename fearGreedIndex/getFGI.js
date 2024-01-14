const puppeteer = require('puppeteer-core');

async function getFearAndGreedIndex() {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.goto('https://production.dataviz.cnn.io/index/fearandgreed/graphdata', { waitUntil: 'domcontentloaded' });
        const selector = 'pre'
        await page.waitForSelector(selector)
        let data = await page.$eval(selector, (element) => element.textContent);
        let data_json = JSON.parse(data);
        return data_json['fear_and_greed'];
    } catch (error) {
        console.error('Error during crawling:', error.message);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = {
  getFearAndGreedIndex
}