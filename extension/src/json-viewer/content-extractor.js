var Promise = require('promise');
var jsonFormater = require('./jsl-format');

var TOKEN = (Math.random() + 1).toString(36).slice(2, 7);
var WRAP_START = "<wrap_" + TOKEN + ">";
var WRAP_END = "</wrap_" + TOKEN +">";
var NUM_REGEX = /^-?\d+\.?[\deE]*$/g;

var WRAP_REGEX = new RegExp(
  "^" + WRAP_START + "(-?\\d+\\.?[\\deE]*)" + WRAP_END + "$", "g"
);

var REPLACE_WRAP_REGEX = new RegExp(
  "\"" + WRAP_START + "(-?\\d+\\.?[\\deE]*)" + WRAP_END + "\"", "g"
);

function contentExtractor(pre, options) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var jsonExtracted = extractJSON(rawJsonText);
      var wrappedText = wrapNumbers(jsonExtracted);

      var jsonParsed = JSON.parse(wrappedText);
      if (options.addons.sortKeys) jsonParsed = sortByKeys(jsonParsed);

      // Validate and decode json
      var decodedJson = JSON.stringify(jsonParsed);
      decodedJson = decodedJson.replace(REPLACE_WRAP_REGEX, "$1");

      var jsonFormatted = jsonFormater(decodedJson, options.structure);
      var jsonText = rawJsonText.replace(jsonExtracted, jsonFormatted);
      resolve({jsonText: jsonText, jsonExtracted: decodedJson});

    } catch(e) {
      reject(new Error('contentExtractor: ' + e.message));
    }
  });
}

function extractJSON(rawJson) {
  return rawJson
    .replace(/\s*while\((1|true)\)\s*;?/, '')
    .replace(/\s*for\(;;\)\s*;?/, '')
    .replace(/^[^{\[].+\({/, '{')
    .replace(/}\);?\s*$/, '}');
}

function sortByKeys(obj) {
    if (typeof obj !== 'object' || !obj) return obj;

    var sorted;
    if (Array.isArray(obj)) {
      sorted = [];
      obj.forEach(function(val, idx) {
        sorted[idx] = sortByKeys(val);
      });

    } else {
      sorted = {};
      Object.keys(obj).sort().forEach(function(key) {
        sorted[key] = sortByKeys(obj[key]);
      });
    }

    return sorted;
};

// Pass all numbers to json parser as strings in order to maintain precision,
// unwrap them later without quotes.
//
// Solution with some changes from https://github.com/alexlopashev
function wrapNumbers(text) {
  var buffer = "";
  var numberBuffer = "";
  var isInString = false;
  var isInNumber = false;
  var previous = "";

  for (var i = 0, len = text.length; i < len; i++) {
    var char = text[i];

    if (char == '"' && previous != '\\') {
      isInString = !isInString;
    }

    if (!isInString && !isInNumber && isCharInNumber(char, previous)) {
      isInNumber = true;
    }

    if (!isInString && isInNumber && isCharInString(char, previous)) {
      isInNumber = false;

      if (numberBuffer.match(NUM_REGEX)) {
        buffer += '"' + WRAP_START + numberBuffer + WRAP_END + '"';

      } else {
        buffer += numberBuffer;
      }

      numberBuffer = "";
    }

    if (isInNumber) {
      numberBuffer += char;

    } else {
      buffer += char;
      previous = char;
    }
  }

  return buffer;
}

function isCharInNumber(char, previous) {
  return ('0' <= char && char <= '9') ||
         ('0' <= previous && previous <= '9' && (char == 'e' || char == 'E')) ||
         char == '.' ||
         char == '-';
}

function isCharInString(char, previous) {
  return ('0' > char || char > '9') &&
         char != 'e' &&
         char != 'E' &&
         char != '.' &&
         char != '-';
}

module.exports = contentExtractor;
