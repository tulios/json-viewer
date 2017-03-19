var Promise = require('promise');
var jsonFormater = require('./jsl-format');
var extractJSON = require('./extract-json');

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

function getJSON(pre, options) {
  return new Promise(function(resolve, reject) {
    try {
      var rawJsonText = pre.textContent;
      var jsonpWrapper = extractJSON.getWrapper(rawJsonText);
      var jsonExtracted = extractJSON.replaceWrapper(rawJsonText);
      var wrappedText = wrapNumbers(jsonExtracted);

      var jsonParsed = JSON.parse(wrappedText);
      if (options.addons.sortKeys) jsonParsed = sortByKeys(jsonParsed);

      resolve({jsonObj: jsonParsed, jsonpWrapper: jsonpWrapper, options: options});
    } catch(e) {
      reject(new Error('contentExtractor: ' + e.message));
    }
  });
}

function formatJSON(data) {
  return new Promise(function(resolve, reject) {
    var decodedJson = JSON.stringify(data.jsonObj).replace(REPLACE_WRAP_REGEX, "$1");
    var jsonFormatted = normalize(jsonFormater(decodedJson, data.options.structure));
    var filterQuery = data.filterQuery
      ? '/* FILTER: ' + data.filterQuery + ' */\n'
      : ''
    var jsonText =
      filterQuery +
      normalize(data.jsonpWrapper.header) +
      jsonFormatted +
      normalize(data.jsonpWrapper.footer);

    resolve({jsonText: jsonText, jsonObj: data.jsonObj});
  })
}

function normalize(json) {
  return json.replace(/\$/g, '$$$$');
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
  var charIsEscaped = false;
  var isInNumber = false;
  var previous = "";
  var beforePrevious = "";

  for (var i = 0, len = text.length; i < len; i++) {
    var char = text[i];

    if (char == '"' && !charIsEscaped) {
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

    // this applies to the _next_ character - the one used in the next iteration
    charIsEscaped = (char == '\\') ? !charIsEscaped : false

    if (isInNumber) {
      numberBuffer += char;

    } else {
      buffer += char;
      beforePrevious = previous;
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

module.exports = {
  getJSON: getJSON,
  formatJSON: formatJSON
};
