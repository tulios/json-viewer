var Promise = require('promise');
var extractJSON = require('./extract-json');
var jsonFormater = require('./jsl-format');

function contentExtractor(pre) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var jsonExtracted = extractJSON(rawJsonText);

      //validate and decode json
      var decodedJson = JSON.stringify(JSON.parse(jsonExtracted));

      // match any numbers (integers, floats, negatives)
      var regex = /\"\s*:\s*(-?\d+\.?\d*)\s*,/g;

      // Replace the numbers with their original values to avoid convert numbers
      // bigger than Number.MAX_VALUE and so on
      // https://github.com/tulios/json-viewer/issues/37
      var matches = rawJsonText.match(regex);
      if (matches && matches.length > 0) {
        decodedJson.match(regex).forEach(function(number, i) {
          decodedJson = decodedJson.replace(number, matches[i]);
        });
      }

      var jsonText = rawJsonText.replace(jsonExtracted, jsonFormater(decodedJson));
      resolve({jsonText: jsonText, jsonExtracted: decodedJson});

    } catch(e) {
      reject(e);
    }
  });
}

module.exports = contentExtractor;
