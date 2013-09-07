//= require util.js
//= require_self

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === "GET_OPTIONS") {
    sendResponse(getOptions());
  }

});
