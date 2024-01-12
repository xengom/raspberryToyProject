const holi = require('korean-business-day');

module.exports = () => {
  return {
    /**
     * 개인 정보 세팅.
     * @param array [id, pw, loc]
     * @returns str 개인정보
     */
    personalInfo() {
      // argv는 node 실행경로와 실행된 JavaScript 파일경로가 포함되므로 index 2번 부터 데이터가 들어간다.
      const info = process.argv.splice(2);
      console.log(`
        ${new Date}
        아이디 : ${info[0]}
        비밀번호 : ${info[1]}
      `);
      const location = info[2] !== undefined ? info[2] : null;
      if (location) info[2] = location;
      return info;
    },
    /**
     * 한국 시간 세팅.
     * @param
     * @returns str 오늘 날짜 (UTC+9)
     */
    koreanDate() {
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date((new Date().getTime() + koreaTimeDiff));
      return `${korNow.getFullYear()}-${korNow.getMonth() + 1}-${korNow.getDate()}`;
    },
    /**
     * 한국 공휴일 여부.
     * @param
     * @returns boolean
     */
    isHoliday() {
      return holi.isHoliday(new Date);
    }
  }
};