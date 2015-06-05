var jsonFormater = require('../jsl-format');

var structureConfigs = {
  lineWrapping: true,
  lineNumbers: true,
  foldGutter: true,
  indentUnit: 2
}

function renderStructure(CodeMirror) {
  var structureInput = document.getElementById('structure');
  structureInput.innerHTML = jsonFormater(JSON.stringify(structureConfigs));

  CodeMirror.fromTextArea(structureInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });
}

module.exports = renderStructure;
