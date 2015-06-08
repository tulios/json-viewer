var Promise = require('promise');
var chrome = require('chrome-framework');

function getOptions() {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage({action: "GET_OPTIONS"}, function(err, response) {
      if (err) {
        reject(err);

      } else {
        resolve(response);
      }
    });
  });
}

module.exports = getOptions;
