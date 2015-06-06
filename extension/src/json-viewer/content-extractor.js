var Promise = require('promise');
var extractJSON = require('./extract-json');
var jsonFormater = require('./jsl-format');

function contentExtractor(pre) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var jsonExtracted = extractJSON(rawJsonText);

      // validate json
      JSON.parse(jsonExtracted);

      var jsonText = jsonFormater(rawJsonText);
      resolve({jsonText: jsonText, jsonExtracted: jsonExtracted})

    } catch(e) {
      pre.hidden = false;
      reject(e);
    }
  });
}

module.exports = contentExtractor;
