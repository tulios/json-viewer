var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
var merge = require('./merge');
var defaults = require('./options/defaults');

function Highlighter(jsonText, options) {
  this.options = options || {};
  this.text = jsonText;
  this.theme = this.options.theme || "default";
  this.theme = this.theme.replace(/_/, ' ');
}

Highlighter.prototype.highlight = function() {
  var obligatory = {
    value: this.text,
    theme: this.theme,
    mode: "application/ld+json",
    indentUnit: 2,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  }

  var optional = defaults.structure;
  var configured = this.options.structure;

  this.editor = CodeMirror(
    document.body,
    merge({}, optional, configured, obligatory)
  );
}

module.exports = Highlighter;
