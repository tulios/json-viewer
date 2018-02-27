var JSONUtils = require('./json-viewer/check-if-json');
var highlightContent = require('./json-viewer/highlight-content');
var loadScratchPadEditor = require('./json-viewer/scratch-pad/load-editor');

function onLoad() {
  var pre = document.getElementsByTagName("pre")[0];
  var query = window.location.search.substring(1);

  if (isScratchPad(query)) handleScratchPad(pre);
  else handleJSONHighlight(pre, query);
}

function handleScratchPad(pre) {
  pre.hidden = true;
  loadScratchPadEditor(pre);
}

function handleJSONHighlight(pre, query) {
  var rawJson = query.replace(/^json=/, '');
  pre.innerText = decodeURIComponent(rawJson);

  JSONUtils.checkIfJson(function(pre) {
    pre.hidden = true;
    highlightContent(pre, true);
  }, pre);
}

function isScratchPad(query) {
  return /scratch-page=true/.test(query);
}

document.addEventListener("DOMContentLoaded", onLoad, false);
