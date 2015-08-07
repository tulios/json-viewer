function getPreWithSource() {
  var childNodes = document.body.childNodes;
  var pre = childNodes[0];
  if (childNodes.length === 1 && pre.tagName === "PRE") return pre
  return null
}

function checkIfJson(sucessCallback, element) {
  var pre = element || getPreWithSource();
  if (pre !== null && pre !== undefined) {
    sucessCallback(pre);
  }
}

module.exports = checkIfJson;
