var chrome = require('chrome-framework');
var svgGear = require('./svg-gear');
var svgRaw = require('./svg-raw');
var svgUnfold = require('./svg-unfold');

function renderExtras(pre, options, highlighter) {
  var extras = document.createElement("div");
  extras.className = "extras";

  if (!options.addons.autoHighlight) {
    extras.className += ' auto-highlight-off';
  }

  var optionsLink = document.createElement("a");
  optionsLink.className = "json_viewer icon gear";
  optionsLink.href = chrome.extension.getURL("/pages/options.html");
  optionsLink.target = "_blank";
  optionsLink.title = "Options";
  optionsLink.setAttribute("aria-label", "Open JSON Viewer options");
  optionsLink.setAttribute("role", "button");
  optionsLink.setAttribute("tabindex", "0");
  optionsLink.innerHTML = svgGear;

  var rawLink = document.createElement("a");
  rawLink.className = "json_viewer icon raw";
  rawLink.href = "#";
  rawLink.title = "Original JSON toggle";
  rawLink.setAttribute("aria-label", "Toggle between highlighted and raw JSON");
  rawLink.setAttribute("role", "button");
  rawLink.setAttribute("tabindex", "0");
  rawLink.setAttribute("aria-pressed", "false");
  rawLink.innerHTML = svgRaw;
  rawLink.onclick = function(e) {
    e.preventDefault();
    var editor = document.getElementsByClassName('CodeMirror')[0];

    if (pre.hidden) {
      // Raw enabled
      highlighter.hide();
      pre.hidden = false;
      extras.className += ' auto-highlight-off';
      rawLink.setAttribute("aria-pressed", "true");

    } else {
      // Raw disabled
      highlighter.show();
      pre.hidden = true;
      extras.className = extras.className.replace(/\s+auto-highlight-off/, '');
      rawLink.setAttribute("aria-pressed", "false");
    }
  }
  // Keyboard accessibility: Enter/Space to toggle
  rawLink.onkeydown = function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      rawLink.click();
    }
  }

  var unfoldLink = document.createElement("a");
  unfoldLink.className = "json_viewer icon unfold";
  unfoldLink.href = "#";
  unfoldLink.title = "Fold/Unfold all toggle";
  unfoldLink.setAttribute("aria-label", "Toggle fold/unfold all JSON nodes");
  unfoldLink.setAttribute("role", "button");
  unfoldLink.setAttribute("tabindex", "0");
  unfoldLink.setAttribute("aria-pressed", "false");
  unfoldLink.innerHTML = svgUnfold;
  unfoldLink.onclick = function(e) {
    e.preventDefault();
    var value = pre.getAttribute('data-folded')

    if (value === 'true' || value === true) {
      highlighter.unfoldAll();
      pre.setAttribute('data-folded', false)
      unfoldLink.setAttribute("aria-pressed", "false");

    } else {
      highlighter.fold();
      pre.setAttribute('data-folded', true)
      unfoldLink.setAttribute("aria-pressed", "true");
    }
  }
  // Keyboard accessibility: Enter/Space to toggle
  unfoldLink.onkeydown = function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      unfoldLink.click();
    }
  }

  extras.appendChild(optionsLink);
  extras.appendChild(rawLink);

  // "awaysFold" was a typo but to avoid any problems I'll keep it
  // a while
  pre.setAttribute('data-folded', options.addons.alwaysFold || options.addons.awaysFold)
  extras.appendChild(unfoldLink);

  document.body.appendChild(extras);
}

module.exports = renderExtras;
