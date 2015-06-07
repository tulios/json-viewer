require('./viewer-styles');
var checkIfJson = require('./json-viewer/check-if-json');
var contentExtractor = require('./json-viewer/content-extractor');
var Highlighter = require('./json-viewer/highlighter');
var loadCss = require('./json-viewer/load-css');
var timestamp = require('./json-viewer/timestamp');
var exposeJson = require('./json-viewer/viewer/expose-json');
var renderExtras = require('./json-viewer/viewer/render-extras');
var getOptions = require('./json-viewer/viewer/get-options');
var loadRequiredCss = require('./json-viewer/viewer/load-required-css');

function oversizedJSON(pre, options) {
  return pre.textContent.length > (options.addons.maxJsonSize * 1024);
}

function prependHeader(options, jsonText) {
  if (options.addons.prependHeader) {
    var header = "// " + timestamp() + "\n";
    header += "// " + document.location.href + "\n\n";
    jsonText = header + jsonText;
  }

  return jsonText;
}

function highlightContent(pre) {
  getOptions().then(function(options) {

    if (oversizedJSON(pre, options)) return pre.hidden = false;

    return loadRequiredCss(options).
      then(function() { return contentExtractor(pre) }).
      then(function(value) {

        var formatted = prependHeader(options, value.jsonText);
        var highlighter = new Highlighter(formatted, options);
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
