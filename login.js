const puppeteer = require('puppeteer-core');
const holi = require("korean-business-day");

/**
 * 개인 정보 세팅.
 * @param 
 * @returns str 개인정보
 */
const personalInfo = () => {
  // argv는 node 실행경로와 실행된 JavaScript 파일경로가 포함되므로 index 2번 부터 데이터가 들어간다.
  const info = process.argv.splice(2);
  console.log(`
    ${new Date}
    아이디 : ${info[0]}
    비밀번호 : ${info[1]}
    출근위치 : ${info[2]}
  `);
  info[2] = encodeURI(info[2]);
  return info;
}
/**
 * 한국 시간 세팅.
 * @param
 * @returns str 오늘 날짜 (UTC+9)
 */
const koreanDate = () => {
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date((new Date().getTime() + koreaTimeDiff));
  return `${korNow.getFullYear()}-${korNow.getMonth() + 1}-${korNow.getDate()}`;
}

/**
 * 한국 공휴일 여부.
 * @param
 * @returns boolean
 */
const isHoliday = () => {
  return holi.isHoliday(new Date);
}

// puppeteer class
class Puppet {
  browser = null;
  page = null;
  url = null;

  async openBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async openPage() {
    this.page = await this.browser.newPage();
  }

  async accessSite(info) {
    try {
      await this.page.goto(this.url, { waitUntil: 'networkidle2' });
      console.log(`${info} success`);
    } catch (err){
      console.log(`${info} failed`);
      console.log(`error log : ${err}`);
    }
  }

  async closeBrowser() {
    await this.browser.close();
    console.log(`browser closed`);
  }
}

const login = async () => {
  const PERSONAL_INFO = personalInfo();
  const TODAY = new Date;
  if (!isHoliday()) {
    const puppet = new Puppet();
    await puppet.openBrowser();
    await puppet.openPage();

    puppet.url = 'https://www.projectware.kr/A/In.aspx'
      +'?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D'
      +'&__VIEWSTATEGENERATOR=6F4A89F0'
      +'&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J'
      +'&cid=dgrmsoft'
      +'&uid=' + PERSONAL_INFO[0]
      +'&pwd=' + PERSONAL_INFO[1]
      +'&x=64'
      +'&y=42';
    await puppet.accessSite('login');

    puppet.url = 'https://www.projectware.kr/Site/Util/DutyB.aspx'
      +'?i=1'
      +'&__VIEWSTATE=%2FwEPDwUKMjA5NTU4NzY2Ng9kFgJmD2QWDAIFDxYCHglpbm5lcmh0bWwFA%2ByImGQCCQ8WAh4IZGlzYWJsZWRkZAILDxYCHgdWaXNpYmxlaGQCJQ8WAh8ABQ0xMTUuMTQwLjI0LjczZAInDxYCHwJnZAIpDxYCHwJnZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WCAUEcklvMQUEcklvMgUFZE91dDEFBWRIb2wxBQVkT3ZlcgUFZE91dDIFBWRIb2wyBQVkRWFybLqXQTQmJ0tjD95hlt1jDm%2FQ3X0H'
      +'&__VIEWSTATEGENERATOR=0B65CD93'
      +'&__EVENTVALIDATION=%2FwEWFALN0%2FfqCwKsouKWDwKaz47lCAKAgNSyDAKAgPjvBQKCmIvSBQKCmPfRBQKC4LzrDgKQ%2FOLtDgKdgannDwKdgZXnDwLgyYbzBAKF4LzrDgKT%2FOLtDgKTz7KaCgKA9O2MAwKNmJvSBQKf1e7VCgKNmNvRBQKogfnmD2QevEiALlEL%2FXGeJbGsMHWX9tIR'
      +'&xFn=a'
      +'&dDate=' + koreanDate()
      +'&rIo=rIo2'
      +'&sH2=' + TODAY.getHours()
      +'&sM2=' + TODAY.getMinutes()
      +'&dMemo=' + PERSONAL_INFO[2]
      +'&xT1=1'
      +'&xFg=0000'
      +'&xD1=476'
      +'&xD2='
    await puppet.accessSite('location input');
    await puppet.closeBrowser();
  } else {
    console.log('HAPPY HOLIDAY');
  }
}

login().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
});
