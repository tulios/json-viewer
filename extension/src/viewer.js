require('./viewer-styles');
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

document.addEventListener("DOMContentLoaded", function() {

  checkIfJson(function(pre) {
    pre.hidden = true;

    loadCss({path: "assets/viewer.css", checkClass: "json-viewer-css-check"}, function() {
      contentExtractor(pre, function(jsonText, extractedJson) {

        new Highlighter(jsonText).highlight();
        exposeJson(extractedJson);

      });
    });
  });

}, false);
