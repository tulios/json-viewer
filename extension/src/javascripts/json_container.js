//= require prism.js
//= require prism-code-folder.js
//= require jsl-format.js
//= require content_util.js
//= require content.js
//= require_self

// Override -> content.js
function getPreWithSource() {
  return getPre();
}

// Override -> content.js
function isPrependHeaderEnabled() {
  return false; // Anonymous page should never include header
}

function getPre() {
  return document.getElementsByTagName("pre")[0];
}

function jsonContainerReady() {
  var pre = getPre();
  var rawJson = window.location.search.substring(1).replace(/^json=/, '');
  pre.innerText = decodeURIComponent(rawJson);
  contentReady();
}

document.addEventListener("DOMContentLoaded", jsonContainerReady, false);
