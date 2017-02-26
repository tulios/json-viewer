function exposeJson(jsonObj, outsideViewer) {
  console.info("[JSONViewer] Your json was stored into 'window.json', enjoy!");

  if (outsideViewer) {
    window.json = jsonObj;

  } else {
    var script = document.createElement("script") ;
    script.innerHTML = 'window.json = ' + JSON.stringify(jsonObj) + ';';
    document.head.appendChild(script);
  }
}

module.exports = exposeJson;
