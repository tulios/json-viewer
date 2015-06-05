require('./options-styles');
var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/mode/css/css');

var renderThemeList = require('./json-viewer/options/render-theme-list');
var renderStructure = require('./json-viewer/options/render-structure');
var renderStyle = require('./json-viewer/options/render-style');

function onLoaded() {
  renderThemeList(CodeMirror);
  renderStructure(CodeMirror);
  renderStyle(CodeMirror);
}

document.addEventListener("DOMContentLoaded", onLoaded, false);
