function getPreWithSource() {
  var childNodes = document.body.childNodes;
  var pre = childNodes[0];

  if (childNodes.length === 1 && pre.tagName === "PRE") {
    pre.textContent = pre.textContent.replace(/^.+[a-zA-Z0-9_$\.]+\(/, '').replace(/\);?$/, '');
    return pre;
  }

  return null
}

function checkIfJson(sucessCallback, element) {
  var pre = element || getPreWithSource();
  if (pre !== null && pre !== undefined) {
    sucessCallback(pre);
  }
}

module.exports = checkIfJson;
