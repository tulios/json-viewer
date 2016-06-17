function getPreWithSource() {
  var childNodes = document.body.childNodes;
  var pre = childNodes[0];
  if (childNodes.length === 1 && pre.tagName === "PRE") return pre
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

function checkIfJson(sucessCallback, element) {
  var pre = element || getPreWithSource();
  if (pre !== null && pre !== undefined && isJSON(pre.textContent)) {
    sucessCallback(pre);
  }
}

module.exports = checkIfJson;
