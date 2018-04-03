var merge = require('../merge');
var Highlighter = require('../highlighter');
var getOptions = require('../viewer/get-options');
var loadRequiredCss = require('../viewer/load-required-css');
var renderExtras = require('../viewer/render-extras');
var renderFormatButton = require('./render-format-button');
var jsonFormater = require('../jsl-format');
var JSONUtils = require('../check-if-json');
var exposeJson = require('../viewer/expose-json');

function loadEditor(pre) {
  getOptions().then(function(options) {
    return loadRequiredCss(options).then(function() {
      var scratchPadOptions = merge({}, options);
      scratchPadOptions.structure.readOnly = false;

      var highlighter = new Highlighter("", scratchPadOptions);
      highlighter.highlight();

      renderExtras(pre, options, highlighter);
      renderFormatButton(function() {
        var text = highlighter.editor.getValue();
        highlighter.editor.setValue(jsonFormater(text));
        if (JSONUtils.isJSON(text)) {
          exposeJson(text, true);
        }
      });

    });
  }).catch(function(e) {
    console.error('[JSONViewer] error: ' + e.message, e);
  });
}

module.exports = loadEditor;
