const puppeteer = require('puppeteer-core');

class Puppet {
  browser = null;
  page = null;
  url = null;

  async setConfig() {
    this.browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async accessSite(info) {
    this.page = await this.browser.newPage();
    console.log(`trying ${info}`);
    try {
      await this.page.goto(this.url, { waitUntil: 'networkidle2' });
      console.log(`success ${info}`)
    } catch (err){
      console.log(`failed ${info}`)
      console.log(err)
    }
  }

  async closeBrowser() {
    console.log(`trying close browser`)
    await this.browser.close();
    console.log(`browser closed`)
  }
}

const logout = async () => {
  /* user Info */
  const USER_ID = 'D20211204';
  const USER_PASSWORD = 'D20211204';

  const puppet = new Puppet();
  puppet.url = `https://www.projectware.kr/A/In.aspx?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D&__VIEWSTATEGENERATOR=6F4A89F0&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J&cid=dgrmsoft&uid=${USER_ID}&pwd=${USER_PASSWORD}&x=64&y=42`;
  console.log(puppet.url)
  await puppet.setConfig();
  await puppet.accessSite('login');

  puppet.url = `https://www.projectware.kr/Site/Out.aspx`
  console.log(puppet.url)
  await puppet.page.goto(puppet.url, { waitUntil: 'networkidle2' })

  await puppet.closeBrowser();
}

logout().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
});
