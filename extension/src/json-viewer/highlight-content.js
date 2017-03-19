var contentExtractor = require('./content-extractor');
var jsonFilter = require('./filter');
var Highlighter = require('./highlighter');
var timestamp = require('./timestamp');
var exposeJson = require('./viewer/expose-json');
var renderExtras = require('./viewer/render-extras');
var renderAlert = require('./viewer/render-alert');
var getOptions = require('./viewer/get-options');
var loadRequiredCss = require('./viewer/load-required-css');

function oversizedJSON(pre, options) {
  var jsonSize = pre.textContent.length;
  var accepted = options.addons.maxJsonSize;

  var loaded = jsonSize / 1024;
  var maxJsonSize = accepted * 1024;
  var isOversizedJSON = jsonSize > maxJsonSize;

  if (process.env.NODE_ENV === 'development') {
    console.debug("[JSONViewer] JSON size: " + loaded + " kbytes");
    console.debug("[JSONViewer] Max JSON size: " + accepted + " kbytes");
    console.debug("[JSONViewer] " + jsonSize + " > " + maxJsonSize + " = " + isOversizedJSON);
  }

  if (isOversizedJSON) {
    console.warn(
      "[JSONViewer] Content not highlighted due to oversize. " +
      "Accepted: " + accepted + " kbytes, received: " + loaded + " kbytes. " +
      "It's possible to change this value at options -> Add-ons -> maxJsonSize"
    );
    renderAlert(pre, options,
      "[JSONViewer] Content not highlighted due to oversize. " +
      "Take a look at the console log for more information."
    );
  }

  return isOversizedJSON;
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
      return pre.hidden = false;
    }

    var filterQuery = decodeURIComponent(document.location.hash.substring(1)) || ''

    return contentExtractor.getJSON(pre, options)
      .then((data) => {
        exposeJson(data.jsonObj, outsideViewer);
        return data;
      })
      .then(jsonFilter.applyQuery(filterQuery))
      .then(contentExtractor.formatJSON)
      .then(function(data) {
        return loadRequiredCss(options).then(function() { return data; });
      })
      .then(function(data) {

        var formatted = prependHeader(options, outsideViewer, data.jsonText);
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

        renderExtras(pre, options, highlighter);
      });

  }).catch(function(e) {
    pre.hidden = false;
    if (process.env.NODE_ENV === 'development') {
      console.error('[JSONViewer] error: ' + e.message, e);
    }
  });
}

module.exports = highlightContent;
