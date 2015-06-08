var checkIfJson = require('./json-viewer/check-if-json');
var highlightContent = require('./json-viewer/highlight-content');

function onLoad() {
  var rawJson = window.location.search.substring(1).replace(/^json=/, '');
  var pre = document.getElementsByTagName("pre")[0];
  pre.innerText = decodeURIComponent(rawJson);

  checkIfJson(function(pre) {
    pre.hidden = true;
    highlightContent(pre, true);
  }, pre);
}

document.addEventListener("DOMContentLoaded", onLoad, false);
