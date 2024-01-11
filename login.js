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

const login = async () => {
  /* user Info */
  const USER_ID = 'D20211204';
  const USER_PASSWORD = 'D20211204';
  const location = '[기흥]'
  const date = new Date();
  const DATE_TODAY = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const WORK_LOCATION = encodeURI(location)

  const puppet = new Puppet();
  puppet.url = `https://www.projectware.kr/A/In.aspx?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D&__VIEWSTATEGENERATOR=6F4A89F0&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J&cid=dgrmsoft&uid=${USER_ID}&pwd=${USER_PASSWORD}&x=64&y=42`;
  console.log(puppet.url)
  await puppet.setConfig();
  await puppet.accessSite('login');

  puppet.url = `https://www.projectware.kr/Site/Util/DutyB.aspx?i=1&__VIEWSTATE=%2FwEPDwUKMjA5NTU4NzY2Ng9kFgJmD2QWDAIFDxYCHglpbm5lcmh0bWwFA%2ByImGQCCQ8WAh4IZGlzYWJsZWRkZAILDxYCHgdWaXNpYmxlaGQCJQ8WAh8ABQ0xMTUuMTQwLjI0LjczZAInDxYCHwJnZAIpDxYCHwJnZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WCAUEcklvMQUEcklvMgUFZE91dDEFBWRIb2wxBQVkT3ZlcgUFZE91dDIFBWRIb2wyBQVkRWFybLqXQTQmJ0tjD95hlt1jDm%2FQ3X0H&__VIEWSTATEGENERATOR=0B65CD93&__EVENTVALIDATION=%2FwEWFALN0%2FfqCwKsouKWDwKaz47lCAKAgNSyDAKAgPjvBQKCmIvSBQKCmPfRBQKC4LzrDgKQ%2FOLtDgKdgannDwKdgZXnDwLgyYbzBAKF4LzrDgKT%2FOLtDgKTz7KaCgKA9O2MAwKNmJvSBQKf1e7VCgKNmNvRBQKogfnmD2QevEiALlEL%2FXGeJbGsMHWX9tIR&xFn=a&dDate=${DATE_TODAY}&rIo=rIo2&sH2=19&sM2=4&dMemo=${WORK_LOCATION}&xT1=1&xFg=0000&xD1=476&xD2=`
  console.log(puppet.url)
  await puppet.page.goto(puppet.url, { waitUntil: 'networkidle2' })

  await puppet.closeBrowser();
}

login().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
});
