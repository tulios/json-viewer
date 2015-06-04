var chrome = require("chrome-framework");

function loadCSS(opts, doneCallback) {
  var url = chrome.extension.getURL(opts.path);

	var link = document.createElement("link");
	var sheets = document.styleSheets;
  link.rel = "stylesheet";
  link.href = url;

  document.head.appendChild(link);

  var checkElement = document.createElement("div");
  checkElement.setAttribute("class", opts.checkClass);
  document.body.appendChild(checkElement);

  var scheduleId = null;
  function scheduleCheck() {
    var content = window.
      getComputedStyle(checkElement, ":before").
      getPropertyValue("content");

    if (content === "'loaded'" || content === "loaded") {
      clearTimeout(scheduleId);
      document.body.removeChild(checkElement);
      doneCallback();

    } else {
      scheduleId = setTimeout(scheduleCheck);
    }
  }

  scheduleCheck();
}

module.exports = loadCSS;
