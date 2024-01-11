const puppeteer = require('puppeteer-core');
const holi = require("korean-business-day")

const koreaTimeDiff = 9 * 60 * 60 * 1000;
const korNow = new Date((new Date().getTime() + koreaTimeDiff));
const isHoliday = holi.isHoliday(korNow);

const USER_ID = process.argv[2];
const USER_PASSWORD = process.argv[3];
const location = process.argv[4];
const DATE_TODAY = `${korNow.getFullYear()}-${korNow.getMonth() + 1}-${korNow.getDate()}`
const WORK_LOCATION = encodeURI(location)

console.log(`
  아이디 : ${USER_ID}
  비밀번호 : ${USER_PASSWORD}
  출근위치 : ${location}
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

const login = async () => {
  if (!isHoliday) {
    const puppet = new Puppet();
    puppet.url = `https://www.projectware.kr/A/In.aspx?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D&__VIEWSTATEGENERATOR=6F4A89F0&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J&cid=dgrmsoft&uid=${USER_ID}&pwd=${USER_PASSWORD}&x=64&y=42`;
    await puppet.setConfig();
    await puppet.accessSite('login');

    console.log(`typing record work location`)
    puppet.url = `https://www.projectware.kr/Site/Util/DutyB.aspx?i=1&__VIEWSTATE=%2FwEPDwUKMjA5NTU4NzY2Ng9kFgJmD2QWDAIFDxYCHglpbm5lcmh0bWwFA%2ByImGQCCQ8WAh4IZGlzYWJsZWRkZAILDxYCHgdWaXNpYmxlaGQCJQ8WAh8ABQ0xMTUuMTQwLjI0LjczZAInDxYCHwJnZAIpDxYCHwJnZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WCAUEcklvMQUEcklvMgUFZE91dDEFBWRIb2wxBQVkT3ZlcgUFZE91dDIFBWRIb2wyBQVkRWFybLqXQTQmJ0tjD95hlt1jDm%2FQ3X0H&__VIEWSTATEGENERATOR=0B65CD93&__EVENTVALIDATION=%2FwEWFALN0%2FfqCwKsouKWDwKaz47lCAKAgNSyDAKAgPjvBQKCmIvSBQKCmPfRBQKC4LzrDgKQ%2FOLtDgKdgannDwKdgZXnDwLgyYbzBAKF4LzrDgKT%2FOLtDgKTz7KaCgKA9O2MAwKNmJvSBQKf1e7VCgKNmNvRBQKogfnmD2QevEiALlEL%2FXGeJbGsMHWX9tIR&xFn=a&dDate=${DATE_TODAY}&rIo=rIo2&sH2=19&sM2=4&dMemo=${WORK_LOCATION}&xT1=1&xFg=0000&xD1=476&xD2=`
    await puppet.page.goto(puppet.url, { waitUntil: 'networkidle2' })
    console.log(`success record work location`)

    await puppet.closeBrowser();
  } else {
    console.log('HAPPY HOLIDAY')
  }
}

login().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
});
