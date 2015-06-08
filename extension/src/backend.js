var chrome = require('chrome-framework');
var Storage = require('./json-viewer/storage');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  try {
    if (request.action === "GET_OPTIONS") {
      sendResponse(null, Storage.load());
    }
  } catch(e) {
    sendResponse(e.stack);
  }
});
