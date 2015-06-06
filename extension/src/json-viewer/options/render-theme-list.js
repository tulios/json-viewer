var jsonFormater = require('../jsl-format');
var loadCss = require('../load-css');

var themesList = ["default"].concat(process.env.THEMES);
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

function onThemeChange(input, editor) {
  var selectedTheme = input.options[input.selectedIndex].value;
  // Split '_' to allow themes with variations (e.g: solarized dark; solarized light)
  var themeOption = selectedTheme.replace(/_/, ' ');

  var currentLinkTag = document.getElementById('selected-theme');
  if (currentLinkTag !== null) {
    document.head.removeChild(currentLinkTag);
  }

  var themeToLoad = {
    id: "selected-theme",
    path: "themes/" + selectedTheme + ".css",
    checkClass: "theme-" + selectedTheme + "-css-check"
  };

  if (selectedTheme === "default") {
    editor.setOption("theme", themeOption);

  } else {
    loadCss(themeToLoad).then(function() {
      editor.setOption("theme", themeOption);
    });
  }
}

function renderThemeList(CodeMirror, value) {
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

  var optionSelected = value;

  themesList.forEach(function(theme) {
    var option = document.createElement("option");
    option.value = theme
    option.text = theme;

    if (theme === optionSelected) {
      option.selected = "selected";
    }

    themesInput.appendChild(option);
  });

  if (optionSelected && optionSelected !== "default") {
    themes.onchange();
  }
}

module.exports = renderThemeList;
