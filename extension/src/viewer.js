require('./viewer-styles');
var JSONUtils = require('./json-viewer/check-if-json');
var highlightContent = require('./json-viewer/highlight-content');

function onLoad() {
  JSONUtils.checkIfJson(function(pre) {
    pre.hidden = true;
    highlightContent(pre);
  });
}

document.addEventListener("DOMContentLoaded", onLoad, false);
