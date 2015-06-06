var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');

function Highlighter(jsonText, theme) {
  this.text = jsonText;
  this.theme = (theme || "default").replace(/_/, ' ');
}

Highlighter.prototype.highlight = function() {
  this.editor = CodeMirror(document.body, {
    value: this.text,
    readOnly: true,
    theme: this.theme,
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
}

module.exports = Highlighter;
