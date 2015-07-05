var Promise = require('promise');
var extractJSON = require('./extract-json');
var jsonFormater = require('./jsl-format');

var TOKEN = (Math.random() + 1).toString(36).slice(2, 7);
var WRAP_START = "<wrap_" + TOKEN + ">";
var WRAP_END = "</wrap_" + TOKEN +">";
var NUM_REGEX = /^-?\d+\.?\d*$/g;

var WRAP_REGEX = new RegExp(
  "^" + WRAP_START + "(-?\\d+\\.?\\d*)" + WRAP_END + "$", "g"
);

var REPLACE_WRAP_REGEX = new RegExp(
  "\"" + WRAP_START + "(-?\\d+\\.?\\d*)" + WRAP_END + "\"", "g"
);

function contentExtractor(pre) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var wrappedText = wrapIntegers(rawJsonText);
      var jsonExtracted = extractJSON(wrappedText);

      // Validate and decode json
      var decodedJson = JSON.stringify(JSON.parse(jsonExtracted));
      decodedJson = decodedJson.replace(REPLACE_WRAP_REGEX, "$1");

      var jsonText = wrappedText.replace(jsonExtracted, jsonFormater(decodedJson));
      resolve({jsonText: jsonText, jsonExtracted: decodedJson});

    } catch(e) {
      reject(e);
    }
  });
}

// Pass all numbers to json parser as strings in order to maintain precision,
// unwrap them later without quotes.
//
// Solution with some changes from https://github.com/alexlopashev
function wrapIntegers(text) {
  var buffer = "";
  var numberBuffer = "";
  var isInString = false;
  var isInNumber = false;
  var previous = "";

  for (var i = 0, len = text.length; i < len; i++) {
    if (text[i] == '"' && previous != '\\') {
      isInString = !isInString;
    }

    if (!isInString && !isInNumber && isCharInNumber(text[i])) {
      isInNumber = true;
    }

    if (!isInString && isInNumber && isCharInString(text[i])) {
      isInNumber = false;

      if (numberBuffer.match(NUM_REGEX)) {
        buffer += '"' + WRAP_START + numberBuffer + WRAP_END + '"';

      } else {
        buffer += numberBuffer;
      }

      numberBuffer = "";
    }

    if (isInNumber) {
      numberBuffer += text[i];

    } else {
      buffer += text[i];
      previous = text[i];
    }
  }

  return buffer;
}

function isCharInNumber(char) {
  return ('0' <= char && char <= '9') || char == '.' || char == '-';
}

function isCharInString(char) {
  return ('0' > char || char > '9') && char != '.' && char != '-';
}

module.exports = contentExtractor;
