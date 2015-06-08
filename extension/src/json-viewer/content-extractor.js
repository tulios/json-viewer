var Promise = require('promise');
var extractJSON = require('./extract-json');
var jsonFormater = require('./jsl-format');

function contentExtractor(pre) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var jsonExtracted = extractJSON(rawJsonText);

      // validate and decode json
      var decodedJson = JSON.stringify(JSON.parse(jsonExtracted));
      var jsonText = rawJsonText.replace(jsonExtracted, jsonFormater(decodedJson));

      resolve({jsonText: jsonText, jsonExtracted: decodedJson});

    } catch(e) {
      reject(e);
    }
  });
}

module.exports = contentExtractor;
