const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
};

const formatMONTHDate = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "月" + day + "日";
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}; // 
// 时间格式转换 yyyy－mm－dd


function formatTime2(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-');
} // 计算变化多少天后的日期


function DateAddDay(d, days) {
  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
} // 获得本周周日的日期


function FirstDayInThisWeek(d) {
  var d = new Date(d); // console.log(formatTime(DateAddDay(d, 0 - d.getDay())));

  return DateAddDay(d, 0 - d.getDay());
} // 判断类型


function Type(obj) {
  var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
  return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  dateObj.day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  dateObj.week = show_day[day];
  return dateObj;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatMONTHDate: formatMONTHDate,
  formatTime2: formatTime2,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  type: Type,
  addZero: formatNumber,
  dateLater: dateLater
};