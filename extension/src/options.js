require('./options-styles');
var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/mode/css/css');

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
  renderStructure(CodeMirror, currentOptions.structure);
  renderStyle(CodeMirror, currentOptions.style);

  bindSaveButton(function(options) {
    console.log(options);
    if (!isValidJSON(options.structure)) {
      console.log("invalid structure json!");

    } else {
      Storage.save(options);
    }
  });
}

document.addEventListener("DOMContentLoaded", onLoaded, false);
