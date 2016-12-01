var extractJSON = require('./extract-json');

function getPreWithSource() {
  var childNodes = document.body.childNodes;

  if (childNodes.length === 1) {

    var childNode = childNodes[0];

    if (childNode.nodeName === "PRE") {
      return childNode;
    } else if (childNode.nodeName === "#text") { // if Content-Type is text/html
      var pre = document.createElement("pre");
      pre.textContent = childNode.textContent;
      document.body.removeChild(childNode);
      document.body.appendChild(pre);
      return pre;
    }

  }

  return null
}

function isJSON(jsonStr) {
  var str = jsonStr;
  if (!str || str.length === 0) return false
  str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
  str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  return (/^[\],:{}\s]*$/).test(str)
}

function isJSONP(jsonStr) {
  return isJSON(extractJSON(jsonStr));
}

function checkIfJson(sucessCallback, element) {
  var pre = element || getPreWithSource();
  if (pre !== null &&
    pre !== undefined &&
    (isJSON(pre.textContent) || isJSONP(pre.textContent))) {
    sucessCallback(pre);
  }
}

module.exports = checkIfJson;
