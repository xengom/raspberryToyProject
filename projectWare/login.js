const common = require('./common');
const puppet = require('./puppeteer');

module.exports = () => {
  return {
    async login(query) {
      const TODAY = new Date;
      if (!common().isHoliday()) {
        let browser = null;
        let page = null;
        let url = null;
        browser = await puppet().openBrowser();
        page = await puppet().openPage(browser);
        url = 'https://www.projectware.kr/A/In.aspx'
          +'?__VIEWSTATE=%2FwEPDwUJNzkxODEyNzg4ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUDY1N2JaDUH6Uy7DU8dDdQuolw7udz%2Fvo%3D'
          +'&__VIEWSTATEGENERATOR=6F4A89F0'
          +'&__EVENTVALIDATION=%2FwEWBgKt8KuhBAKsouKWDwKzmcmVDALBmcmVDALGmdGVDAK52L%2FtDUNzlW9O9J7JFyMH0TGaXNhZmb7J'
          +'&cid=dgrmsoft'
          +'&uid=' + query.id
          +'&pwd=' + query.pw
          +'&x=64'
          +'&y=42';
        await puppet().accessSite(page, url);

        url = 'https://www.projectware.kr/Site/Util/DutyB.aspx'
          +'?i=1'
          +'&__VIEWSTATE=%2FwEPDwUKMjA5NTU4NzY2Ng9kFgJmD2QWDAIFDxYCHglpbm5lcmh0bWwFA%2ByImGQCCQ8WAh4IZGlzYWJsZWRkZAILDxYCHgdWaXNpYmxlaGQCJQ8WAh8ABQ0xMTUuMTQwLjI0LjczZAInDxYCHwJnZAIpDxYCHwJnZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WCAUEcklvMQUEcklvMgUFZE91dDEFBWRIb2wxBQVkT3ZlcgUFZE91dDIFBWRIb2wyBQVkRWFybLqXQTQmJ0tjD95hlt1jDm%2FQ3X0H'
          +'&__VIEWSTATEGENERATOR=0B65CD93'
          +'&__EVENTVALIDATION=%2FwEWFALN0%2FfqCwKsouKWDwKaz47lCAKAgNSyDAKAgPjvBQKCmIvSBQKCmPfRBQKC4LzrDgKQ%2FOLtDgKdgannDwKdgZXnDwLgyYbzBAKF4LzrDgKT%2FOLtDgKTz7KaCgKA9O2MAwKNmJvSBQKf1e7VCgKNmNvRBQKogfnmD2QevEiALlEL%2FXGeJbGsMHWX9tIR'
          +'&xFn=a'
          +'&dDate=' + common().koreanDate()
          +'&rIo=rIo2'
          +'&sH2=' + TODAY.getHours()
          +'&sM2=' + TODAY.getMinutes()
          +'&dMemo=' + query.loc
          +'&xT1=1'
          +'&xFg=0000'
          +'&xD1=476'
          +'&xD2='
        await puppet().accessSite(page, url);
        await puppet().closeBrowser(browser);
      } else {
        console.log('HAPPY HOLIDAY');
      }
    }
  }
}