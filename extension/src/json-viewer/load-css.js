var Promise = require('promise');
var chrome = require("chrome-framework");
var MAX_WAIT = 20;

function loadCSS(opts) {
  var url = chrome.extension.getURL(opts.path);

  var link = document.createElement("link");
  var sheets = document.styleSheets;
  link.rel = "stylesheet";
  link.href = url;
  if (opts.id) link.id = opts.id;

  document.head.appendChild(link);

  var checkElement = document.createElement("div");
  checkElement.setAttribute("class", opts.checkClass);
  document.body.appendChild(checkElement);

  var scheduleId = null;
  var attempts = 0;

  return new Promise(function(resolve, reject) {
    function scheduleCheck() {
      var content = window.
        getComputedStyle(checkElement, ":before").
        getPropertyValue("content");

      if (attempts > MAX_WAIT) {
        return reject(
          Error("fail to load css: '" + url + "', content loaded: " + content)
        );
      }

      if (/loaded/.test(content)) {
        clearTimeout(scheduleId);
        document.body.removeChild(checkElement);
        resolve();

      } else {
        attempts++;
        scheduleId = setTimeout(scheduleCheck, 1);
      }
    }

    scheduleCheck();
  });
}

module.exports = loadCSS;
