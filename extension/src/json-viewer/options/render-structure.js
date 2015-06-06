var jsonFormater = require('../jsl-format');

function renderStructure(CodeMirror, value) {
  var structureInput = document.getElementById('structure');
  structureInput.innerHTML = jsonFormater(JSON.stringify(value));

  return CodeMirror.fromTextArea(structureInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });
}

module.exports = renderStructure;
