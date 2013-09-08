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

function isJsonp(text) {
  return /^[a-zA-Z0-9_$]+\(/.test(text);
}

function extractJSON(jsonText) {
  if (isJsonp(jsonText)) {
    jsonText = jsonText.replace(/^[a-zA-Z0-9_$]+\(/, '').replace(/\);?$/, '');
  }
  return jsonText;
}

function createLoader() {
  var el = document.createElement("div");
  el.className = "load";
  el.innerHTML = '<div class="spinner"></div><span>Formatting</span></div>';
  return el;
}
