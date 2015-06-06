require('./options-styles');
var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/mode/css/css');
var sweetAlert = require('sweetalert');

var Storage = require('./json-viewer/storage');
var renderThemeList = require('./json-viewer/options/render-theme-list');
var renderStructure = require('./json-viewer/options/render-structure');
var renderStyle = require('./json-viewer/options/render-style');
var bindSaveButton = require('./json-viewer/options/bind-save-button');

function isValidJSON(pseudoJSON) {
  try {
    JSON.parse(pseudoJSON);
    return true;

  } catch(e) {
    return false;
  }
}

function onLoaded() {
  var currentOptions = Storage.load();

  renderThemeList(CodeMirror, currentOptions.theme);
  var structureEditor = renderStructure(CodeMirror, currentOptions.structure);
  var styleEditor = renderStyle(CodeMirror, currentOptions.style);

  bindSaveButton([structureEditor, styleEditor], function(options) {
    if (!isValidJSON(options.structure)) {
      sweetAlert("Ops!", "\"Structure\" isn't a valid JSON", "error");

    } else {
      Storage.save(options);
      sweetAlert("Success", "Options saved!", "success");
    }
  });
}

document.addEventListener("DOMContentLoaded", onLoaded, false);
