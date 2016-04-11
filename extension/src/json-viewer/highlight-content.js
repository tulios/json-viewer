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
    if (oversizedJSON(pre, options)) {
      var accepted = options.addons.maxJsonSize;
      var loaded = pre.textContent.length / 1024;
      console.warn(
        "[JSONViewer] Content not highlighted due to oversize. " +
        "Accepted: " + accepted + " kbytes, received: " + loaded + " kbytes. " +
        "It's possible to change this value at options -> Add-ons -> maxJsonSize"
      )
      return pre.hidden = false;
    }

    return loadRequiredCss(options).
      then(function() { return contentExtractor(pre, options) }).
      then(function(value) {

        var formatted = prependHeader(options, outsideViewer, value.jsonText);
        var highlighter = new Highlighter(formatted, options);

        if (options.addons.autoHighlight) {
          highlighter.highlight();

        } else {
          highlighter.highlight();
          highlighter.hide();
          pre.hidden = false;

          console.warn(
            "[JSONViewer] You are seeing the raw version because you configured the " +
            "addon 'autoHighlight' to false. It's possible to highlight from this page, " +
            "just click at the 'RAW' button in the top-right corner. " +
            "It's possible to change this value at options -> Add-ons -> autoHighlight"
          )
        }

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
    console.error('[JSONViewer] error: ' + e.message, e);
  });
}

module.exports = highlightContent;
