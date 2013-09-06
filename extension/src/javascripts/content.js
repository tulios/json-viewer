function importCss() {
  var array = [
    "all.css"
  ]

  for (var i = 0; i < array.length; i++) {
    var url = chrome.extension.getURL(array[i]);
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href= url;
    document.head.appendChild(link);
  }
}

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

function exportJson(codeText, jsonText) {
  var script = document.createElement("script") ;
  var json = jsonText;
  if (isJsonp(codeText)) {
    json = codeText.replace(/^[a-zA-Z0-9_$]+\(/, '').replace(/\);?$/, '')
  }

  script.innerHTML = 'window.json = ' + json + ';';
  document.head.appendChild(script);
}

function clearPre(pre) {
  pre.innerHTML = null;
  pre.removeAttribute("style");
}

function appendCode(code, pre) {
  clearPre(pre);
  pre.appendChild(code);
  Prism.highlightElement(code);
}

function renderJson(pre) {
  importCss();
  var codeText = pre.textContent;
  var jsonText = jsl.format.formatJson(codeText);

  var code = document.createElement("code");
  var header = "// " + getTimestamp() + "\n";
  header += "// " + document.location.href + "\n\n";

  code.className = "language-json";
  code.textContent = header + jsonText;
  appendCode(code, pre);

  exportJson(codeText, jsonText);
}

function ready () {
  var childNodes = document.body.childNodes;
  var pre = childNodes[0];

  if (childNodes.length === 1 && pre.tagName === "PRE") {
    pre.hidden = true;
    renderJson(pre);
    pre.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", ready, false);
