var jsonFormater = require('../jsl-format');
var defaults = require('./defaults');

function renderStructure(CodeMirror, value) {
  var structureInput = document.getElementById('structure');
  structureInput.innerHTML = value || jsonFormater(JSON.stringify(defaults.structure));

  CodeMirror.fromTextArea(structureInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });
}

module.exports = renderStructure;
