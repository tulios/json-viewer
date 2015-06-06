var Promise = require('promise');
var loadCss = require('../load-css');

function loadRequiredCss(options) {
  var theme = options.theme;
  var loaders = [];
  loaders.push(loadCss({
    path: "assets/viewer.css",
    checkClass: "json-viewer-css-check"
  }));

  if (theme && theme !== "default") {
    loaders.push(loadCss({
      path: "themes/" + theme + ".css",
      checkClass: "theme-" + theme + "-css-check"
    }));
  }

  return Promise.all(loaders);
}

module.exports = loadRequiredCss;
