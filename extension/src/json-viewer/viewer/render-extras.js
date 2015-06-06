var chrome = require('chrome-framework');
var svgGear = require('./svg-gear');
var svgRaw = require('./svg-raw');

function renderExtras(pre) {
  var extras = document.createElement("div");
  extras.className = "extras";

  var optionsLink = document.createElement("a");
  optionsLink.className = "json_viewer gear";
  optionsLink.href = chrome.extension.getURL("/pages/options.html");
  optionsLink.target = "_blank";
  optionsLink.title = "Options";
  optionsLink.innerHTML = svgGear;

  var rawLink = document.createElement("a");
  rawLink.className = "json_viewer raw";
  rawLink.href = "#";
  rawLink.title = "Original JSON toggle";
  rawLink.innerHTML = svgRaw;
  rawLink.onclick = function(e) {
    e.preventDefault();
    var editor = document.getElementsByClassName('CodeMirror')[0];

    if (pre.hidden) {
      editor.hidden = true;
      pre.hidden = false;

    } else {
      editor.hidden = false;
      pre.hidden = true;
    }
  }

  extras.appendChild(optionsLink);
  extras.appendChild(rawLink);
  document.body.appendChild(extras);
}

module.exports = renderExtras;
