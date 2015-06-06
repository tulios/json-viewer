var defaults = require('./defaults');

function renderStyle(CodeMirror, value) {
  var styleInput = document.getElementById('style');
  styleInput.innerHTML = value || defaults.style;

  CodeMirror.fromTextArea(styleInput, {
    mode: "css",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });
}

module.exports = renderStyle;
