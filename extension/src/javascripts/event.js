//= require prism.js
//= require prism-json.js
//= require prism-autolinker.js
//= require util.js
//= require_self

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === "GET_OPTIONS") {
    sendResponse(getOptions());

  } else if (request.action === "HIGHLIGHT") {
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.className = "language-json";
    code.innerHTML = request.html;
    
    pre.innerHTML = code.outerHTML;
    pre.className = "language-json";
    code = pre.childNodes[0];

    Prism.highlightElement(code);
    sendResponse({html: code.outerHTML});
  }

});
