var styleConfigs = [
  ".CodeMirror {",
  "  font-family: monaco, Arial, sans-serif;",
  "  font-size: 16px;",
  "}"
];

function renderStyle(CodeMirror) {
  var styleInput = document.getElementById('style');
  styleInput.innerHTML = styleConfigs.join('\n');

  CodeMirror.fromTextArea(styleInput, {
    mode: "css",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });
}

module.exports = renderStyle;
