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

Highlighter.prototype = {
  highlight: function() {
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
  },

  fold: function() {
    var skippedRoot = false;
    var firstLine = this.editor.firstLine();
    var lastLine = this.editor.lastLine();

    for (var line = firstLine; line <= lastLine; line++) {
      if (!skippedRoot) {
        if (/(\[|\{)/.test(this.editor.getLine(line).trim())) skippedRoot = true;

      } else {
        this.editor.foldCode({line: line, ch: 0}, null, "fold");
      }
    }
  },

  unfoldAll: function() {
    for (var line = 0; line < this.editor.lineCount(); line++) {
      this.editor.foldCode({line: line, ch: 0}, null, "unfold");
    }
  }
}

module.exports = Highlighter;
