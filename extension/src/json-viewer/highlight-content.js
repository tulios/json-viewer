var contentExtractor = require('./content-extractor');
var Highlighter = require('./highlighter');
var timestamp = require('./timestamp');
var exposeJson = require('./viewer/expose-json');
var renderExtras = require('./viewer/render-extras');
var getOptions = require('./viewer/get-options');
var loadRequiredCss = require('./viewer/load-required-css');

function oversizedJSON(pre, options) {
  return pre.textContent.length > (options.addons.maxJsonSize * 1024);
}

function prependHeader(options, outsideViewer, jsonText) {
  if (!outsideViewer && options.addons.prependHeader) {
    var header = "// " + timestamp() + "\n";
    header += "// " + document.location.href + "\n\n";
    jsonText = header + jsonText;
  }

  return jsonText;
}

function highlightContent(pre, outsideViewer) {
  getOptions().then(function(options) {
    if (oversizedJSON(pre, options)) return pre.hidden = false;

    return loadRequiredCss(options).
      then(function() { return contentExtractor(pre, options) }).
      then(function(value) {

        var formatted = prependHeader(options, outsideViewer, value.jsonText);
        var highlighter = new Highlighter(formatted, options);
        highlighter.highlight();

        // "awaysFold" was a typo but to avoid any problems I'll keep it
        // a while
        if (options.addons.alwaysFold || options.addons.awaysFold) {
          highlighter.fold();
        }

        exposeJson(value.jsonExtracted, outsideViewer);
        renderExtras(pre, options, highlighter);

      });

  }).catch(function(e) {
    pre.hidden = false;
    console.error(e);
  });
}

module.exports = highlightContent;
