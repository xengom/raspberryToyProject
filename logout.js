const puppeteer = require('puppeteer-core');
const holi = require("korean-business-day");

const koreaTimeDiff = 9 * 60 * 60 * 1000;
const korNow = new Date((new Date().getTime() + koreaTimeDiff));
const isHoliday = holi.isHoliday(korNow);

const USER_ID = process.argv[2];
const USER_PASSWORD = process.argv[3];

console.log(`
  아이디 : ${USER_ID}
  비밀번호 : ${USER_PASSWORD}
`)

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
  if (!isHoliday) {
    const puppet = new Puppet();
    puppet.url = `https://www.projectware.kr/A/In.aspx?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D&__VIEWSTATEGENERATOR=6F4A89F0&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J&cid=dgrmsoft&uid=${USER_ID}&pwd=${USER_PASSWORD}&x=64&y=42`;
    await puppet.setConfig();
    await puppet.accessSite('login');

    puppet.url = `https://www.projectware.kr/Site/Out.aspx`
    console.log(`trying logout`)
    await puppet.page.goto(puppet.url, { waitUntil: 'networkidle2' })
    console.log(`success logout`)

    await puppet.closeBrowser();
  } else {
    console.log('HAPPY HOLIDAY')
  }
}

logout().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
});
