//= require prism.js
//= require prism-json.js
//= require prism-autolinker.js
//= require prism-code-folder.js
//= require util.js
//= require_self

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === "GET_OPTIONS") {
    sendResponse(getOptions());

  } else if (request.action === "HIGHLIGHT") {
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-json";
    code.innerHTML = replaceAll(replaceAll(request.html, "<", "&lt;"), ">", "&gt;");

    pre.innerHTML = code.outerHTML;
    pre.className = "language-json";
    if (getOptions().awaysFold === "true") {
      pre.setAttribute("data-aways-fold", true);
    }

    code = pre.childNodes[0];

    Prism.highlightElement(code);
    sendResponse({html: code.outerHTML});
  }

});
