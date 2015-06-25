var chrome = require('chrome-framework');
var svgGear = require('./svg-gear');
var svgRaw = require('./svg-raw');
var svgUnfold = require('./svg-unfold');

function renderExtras(pre, options, highlighter) {
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
      // Raw enabled
      highlighter.defaultSearch = true;
      editor.hidden = true;
      pre.hidden = false;

    } else {
      // Raw disabled
      highlighter.defaultSearch = false;
      editor.hidden = false;
      pre.hidden = true;
    }
  }

  var unfoldLink = document.createElement("a");
  unfoldLink.className = "json_viewer unfold";
  unfoldLink.href = "#";
  unfoldLink.title = "Unfold all";
  unfoldLink.innerHTML = svgUnfold;
  unfoldLink.onclick = function(e) {
    e.preventDefault();
    highlighter.unfoldAll();
  }

  extras.appendChild(optionsLink);
  extras.appendChild(rawLink);

  // "awaysFold" was a typo but to avoid any problems I'll keep it
  // a while
  if (options.addons.alwaysFold || options.addons.awaysFold) {
    extras.appendChild(unfoldLink);
  }

  document.body.appendChild(extras);
}

module.exports = renderExtras;
