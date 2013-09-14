var CurrentOptions = {};
var Themes = {
  "okaidia": "assets/themes/okaidia.css",
  "tomorrow": "assets/themes/tomorrow.css",
  "coy": "assets/themes/coy.css",
  "funky": "assets/themes/funky.css",
  "twilight": "assets/themes/twilight.css",
  "dark": "assets/themes/dark.css",
  "jellybeans":"assets/themes/jellybeans.css"
}

function importCss() {
  var array = [
    "assets/all.css"
  ]

  var theme = Themes[CurrentOptions.theme] || null;
  if (theme !== null) {
    array.push(theme);
  }

  for (var i = 0; i < array.length; i++) {
    var url = chrome.extension.getURL(array[i]);
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href= url;
    document.head.appendChild(link);
  }
}

function appendCode(codeText, pre) {
  pre.innerHTML = null;
  pre.removeAttribute("style");
  pre.className = "language-json";

  chrome.runtime.sendMessage({action: "HIGHLIGHT", html: codeText}, function(response) {
    pre.innerHTML = response.html;
    Prism.applyCodeFold();

    var load = document.getElementsByClassName("load");
    if (load && load.length >= 1) {
      load[0].hidden = true;
    }

    pre.hidden = false;
  });
}

function render(pre, jsonText) {
  importCss();
  var codeText = pre.textContent;
  var formattedText = jsl.format.formatJson(codeText);
  var code = document.createElement("code");

  if (CurrentOptions.prependHeader === "true") {
    var header = "// " + getTimestamp() + "\n";
    header += "// " + document.location.href + "\n\n";
    formattedText = header + formattedText;
  }

  appendCode(formattedText, pre);

  // Export
  var script = document.createElement("script") ;
  script.innerHTML = 'window.json = ' + jsonText + ';';
  document.head.appendChild(script);
}

function getPreWithSource() {
  var childNodes = document.body.childNodes;
  var pre = childNodes[0];

  if (childNodes.length === 1 && pre.tagName === "PRE") {
    return pre;
  }

  return null
}

function ready () {
  var pre = getPreWithSource();
  if (pre !== null && pre !== undefined) {
    pre.hidden = true;
    var loader = createLoader();

    chrome.runtime.sendMessage({action: "GET_OPTIONS"}, function(response) {
      CurrentOptions = response;

      if (pre.textContent.length > (parseInt(CurrentOptions.maxJsonSize, 10) * 1024)) {
        pre.hidden = false;
        return;
      }

      document.body.appendChild(loader);
      var jsonText = extractJSON(pre.textContent);

      try {
        JSON.parse(jsonText);
        render(pre, jsonText);

      } catch(e) {
        loader.hidden = true;
        pre.hidden = false;
        throw e;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", ready, false);
