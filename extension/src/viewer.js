require('./viewer-styles');
var chrome = require('chrome-framework');
var checkIfJson = require('./json-viewer/check-if-json');
var contentExtractor = require('./json-viewer/content-extractor');
var Highlighter = require('./json-viewer/highlighter');
var loadCss = require('./json-viewer/load-css');

function exposeJson(text) {
  console.log("JsonViewer: Your json was stored into 'window.json', enjoy!");
  var script = document.createElement("script") ;
  script.innerHTML = 'window.json = ' + text + ';';
  document.head.appendChild(script);
}

function includeExtras() {
  var extras = document.createElement("div");
  extras.className = "extras";

  var optionsLink = document.createElement("a");
  optionsLink.className = "json_viewer gear";
  optionsLink.href = chrome.extension.getURL("/pages/options.html");
  optionsLink.target = "_blank";
  optionsLink.title = "Options";
  optionsLink.style.backgroundImage = "url('" + chrome.extension.getURL("/icons/gear.svg") + "')";

  var rawLink = document.createElement("a");
  rawLink.className = "json_viewer raw";
  rawLink.href = "#";
  rawLink.title = "Original JSON";
  rawLink.style.backgroundImage = "url('" + chrome.extension.getURL("/icons/raw.svg") + "')";

  extras.appendChild(optionsLink);
  extras.appendChild(rawLink);
  document.body.appendChild(extras);
}

document.addEventListener("DOMContentLoaded", function() {

  checkIfJson(function(pre) {
    pre.hidden = true;

    loadCss({path: "assets/viewer.css", checkClass: "json-viewer-css-check"}, function() {
      contentExtractor(pre, function(jsonText, extractedJson) {

        new Highlighter(jsonText).highlight();
        exposeJson(extractedJson);
        includeExtras();

      });
    });
  });

}, false);
