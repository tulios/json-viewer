var Promise = require('promise');
var chrome = require('chrome-framework');

function getOptions() {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage({action: "GET_OPTIONS"}, function(response) {
      resolve(response);
    });
  });
}

module.exports = getOptions;
