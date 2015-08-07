var Promise = require('promise');
var chrome = require('chrome-framework');

function getOptions() {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage({action: "GET_OPTIONS"}, function(response) {
      var err = response.err;
      var value = response.value;

      if (err) {
        reject('getOptions: ' + err.message);

      } else {
        resolve(value);
      }
    });
  });
}

module.exports = getOptions;
