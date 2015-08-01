var svgFormat = require('./svg-format');
var Mousetrap = require('mousetrap');
require('mousetrap/plugins/global-bind/mousetrap-global-bind');

function renderFormatButton(onFormatClick) {
  var extras = document.getElementsByClassName("extras")[0];

  var formatLink = document.createElement("a");
  formatLink.className = "json_viewer icon format";
  formatLink.href = "#";
  formatLink.title = "Format (ctrl+shift+F / command+shift+F)";
  formatLink.innerHTML = svgFormat;
  formatLink.onclick = function(e) {
    e.preventDefault();
    onFormatClick();
  }

  Mousetrap.bindGlobal(['command+shift+f', 'ctrl+shift+f'], function() {
    onFormatClick();
    return false;
  });

  extras.appendChild(formatLink);
}

module.exports = renderFormatButton;
