require('./viewer-styles');
var checkIfJson = require('./json-viewer/check-if-json');
var contentExtractor = require('./json-viewer/content-extractor');
var Highlighter = require('./json-viewer/highlighter');
var loadCss = require('./json-viewer/load-css');
var exposeJson = require('./json-viewer/viewer/expose-json');
var renderExtras = require('./json-viewer/viewer/render-extras');
var getOptions = require('./json-viewer/viewer/get-options');
var loadRequiredCss = require('./json-viewer/viewer/load-required-css');

function highlightContent(pre) {
  getOptions().then(function(options) {

    return loadRequiredCss(options).
      then(function() { return contentExtractor(pre) }).
      then(function(value) {

        var highlighter = new Highlighter(value.jsonText, options);
        highlighter.highlight();

        exposeJson(value.jsonExtracted);
        renderExtras(pre);

      });

  }).catch(function() {
    pre.hidden = false;
  });
}

function onLoad() {
  checkIfJson(function(pre) {
    pre.hidden = true;
    highlightContent(pre);
  });
}

document.addEventListener("DOMContentLoaded", onLoad, false);
