function twoDigits(number) {
  var str = number + "";
  if (str.length === 1) {
    return "0" + str;
  }

  return str;
}

function getTimestamp() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  return date.getFullYear() + twoDigits(month) + twoDigits(day) + twoDigits(hour) + twoDigits(min) + twoDigits(sec);
}

module.exports = getTimestamp;
