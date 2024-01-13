const common = require('./common');
const puppet = require('./puppeteer');

module.exports = () => {
  return {
    async logout(query) {
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
      url = `https://www.projectware.kr/Site/Out.aspx`
      await puppet().accessSite(page, url);
      await puppet().closeBrowser(browser);
    }
  }
}