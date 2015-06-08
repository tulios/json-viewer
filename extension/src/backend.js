var chrome = require('chrome-framework');
var Storage = require('./json-viewer/storage');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    if (request.action === "GET_OPTIONS") {
      sendResponse({err: null, value: Storage.load()});
    }
  } catch(e) {
    console.error(e);
    sendResponse({err: e.stack});
  }
});
