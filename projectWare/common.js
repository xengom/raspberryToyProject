const holi = require('korean-business-day');

module.exports = () => {
  return {
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