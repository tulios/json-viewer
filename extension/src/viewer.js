require('./viewer-styles');
var checkIfJson = require('./json-viewer/check-if-json');
var contentExtractor = require('./json-viewer/content-extractor');
var Highlighter = require('./json-viewer/highlighter');
var loadCss = require('./json-viewer/load-css');
var renderExtras = require('./json-viewer/viewer/render-extras');
var defaults = require('./json-viewer/options/defaults');

function exposeJson(text) {
  console.log("JsonViewer: Your json was stored into 'window.json', enjoy!");
  var script = document.createElement("script") ;
  script.innerHTML = 'window.json = ' + text + ';';
  document.head.appendChild(script);
}

function onLoad() {
  checkIfJson(function(pre) {
    pre.hidden = true;

    var viewerCSS = {path: "assets/viewer.css", checkClass: "json-viewer-css-check"};

    loadCss(viewerCSS).
      then(function() { return contentExtractor(pre) }).
      then(function(value) {

        var highlighter = new Highlighter(value.jsonText).highlight();
        exposeJson(value.jsonExtracted);
        renderExtras(pre, highlighter);

      });
  });
}

document.addEventListener("DOMContentLoaded", onLoad, false);
