var loadCss = require('../load-css');

function renderAlert(pre, options, content) {
  var alertContainer = document.createElement("div");
  alertContainer.className = "json-viewer-alert";
  alertContainer.appendChild(content);

  var closeBtn = document.createElement("a");
  closeBtn.className = "close";
  closeBtn.href = "#";
  closeBtn.title = "Close";
  closeBtn.innerHTML = "×";
  closeBtn.onclick = function(e) {
    e.preventDefault();
    alertContainer.parentNode.removeChild(alertContainer);
  }

  alertContainer.appendChild(closeBtn);

  loadCss({path: "assets/viewer-alert.css", checkClass: "json-viewer-alert"}).then(function() {
    document.body.appendChild(alertContainer);

  }).catch(function(e) {
    alertContainer.hidden = false;
    if (process.env.NODE_ENV === 'development') {
      console.error('[JSONViewer] error: ' + e.message, e);
    }
  });
}

module.exports = renderAlert;
