var chrome = require('chrome-framework');
var Storage = require('./json-viewer/storage');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.action === "GET_OPTIONS") {
    sendResponse(Storage.load());
  }

});
