function isJsonp(text) {
  return /^[a-zA-Z0-9_$]+\(/.test(text);
}

function extractJSON(jsonText) {
  if (isJsonp(jsonText)) {
    jsonText = jsonText.replace(/^[a-zA-Z0-9_$]+\(/, '').replace(/\);?$/, '');
  }
  return jsonText;
}

module.exports = extractJSON;
