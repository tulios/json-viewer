var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
var merge = require('./merge');
var defaults = require('./options/defaults');
var URL_PATTERN = require('./url-pattern');

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

    this.bindRenderLine();
    this.bindMousedown();
    this.editor.refresh();
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
  },

  bindRenderLine: function() {
    var self = this;
    this.editor.off("renderLine");
    this.editor.on("renderLine", function(cm, line, element) {
      var elements = element.getElementsByClassName("cm-string");
      if (!elements || elements.length === 0) return;
      var node = elements[0];
      var text = self.removeQuotes(node.textContent);

      if (text.match(URL_PATTERN)) {
        var decodedText = self.decodeText(text);
        node.classList.add("cm-string-link");
        node.setAttribute("data-url", decodedText);
        node.textContent = self.includeQuotes(decodedText);
      }
    });
  },

  bindMousedown: function() {
    this.editor.off("mousedown");
    this.editor.on("mousedown", function(cm, event) {
      var element = event.target;
      if (element.classList.contains("cm-string-link")) {
        window.open(element.getAttribute("data-url"));
      }
    });
  },

  removeQuotes: function(text) {
    return text.replace(/^\"+/, '').replace(/\"+$/, '');
  },

  includeQuotes: function(text) {
    return "\"" + text + "\"";
  },

  decodeText: function(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    return div.firstChild.nodeValue;
  }
}

module.exports = Highlighter;
