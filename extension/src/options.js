require('./options-styles');
var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/mode/css/css');
var jsonFormater = require('./json-viewer/jsl-format');
var loadCss = require('./json-viewer/load-css');

var themesList = process.env.THEMES;
var themeJSONExample = {
  title: "JSON Example",
  nested: {
    someKey: 7,
    fakes: [
      "list of",
      "fake strings",
      "and fake keys"
    ]
  }
}

var structureConfigs = {
    lineWrapping: true,
    lineNumbers: true,
    foldGutter: true,
    indentUnit: 2
}

var styleConfigs = [
  ".CodeMirror {",
  "  font-family: monaco, Arial, sans-serif;",
  "  font-size: 16px;",
  "}"
];

function onThemeChange(input, editor) {
  var selectedTheme = input.options[input.selectedIndex].value;
  var checkName = selectedTheme.replace(/_/, '-');
  var themeOption = selectedTheme.replace(/_/, ' ');

  var currentLinkTag = document.getElementById('selected-theme');
  if (currentLinkTag !== null) {
    document.head.removeChild(currentLinkTag);
  }

  loadCss({
    id: "selected-theme",
    path: "themes/" + selectedTheme + ".css",
    checkClass: "theme-" + checkName + "-css-check"
  }, function() {

    // Split '_' to allow themes with variations (e.g: solarized dark; solarized light)
    editor.setOption("theme", themeOption);
  });
}

function onLoaded() {
  var themesInput = document.getElementById('themes');
  var themesExampleInput = document.getElementById('themes-example');
  themesExampleInput.innerHTML = jsonFormater(JSON.stringify(themeJSONExample));

  var themeEditor = CodeMirror.fromTextArea(themesExampleInput, {
    readOnly: true,
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  themes.onchange = function() {
    onThemeChange(themesInput, themeEditor);
  }

  themesList.forEach(function(theme) {
    var option = document.createElement("option");
    option.value = theme
    option.text = theme.replace(/_/, '-');
    themesInput.appendChild(option);
  });

  var structureInput = document.getElementById('structure');
  structureInput.innerHTML = jsonFormater(JSON.stringify(structureConfigs));

  var structureEditor = CodeMirror.fromTextArea(structureInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });

  var styleInput = document.getElementById('style');
  styleInput.innerHTML = styleConfigs.join('\n');

  var styleEditor = CodeMirror.fromTextArea(styleInput, {
    mode: "css",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });
}

document.addEventListener("DOMContentLoaded", onLoaded, false);
