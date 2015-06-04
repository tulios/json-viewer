var extractJSON = require('./extract-json');
var jsonFormater = require('./jsl-format');

function contentExtractor(pre, callback) {
  try {
    var rawJsonText = pre.textContent;
    var extractedJson = extractJSON(rawJsonText);

    // validate json
    JSON.parse(extractedJson);

    var jsonText = jsonFormater(rawJsonText);
    callback(jsonText, extractedJson);

  } catch(e) {
    pre.hidden = false;
  }
}

module.exports = contentExtractor;
