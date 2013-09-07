chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === "GET_THEME") {
    sendResponse({theme: localStorage["theme"] || "default"});
  }

});
