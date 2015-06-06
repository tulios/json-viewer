function exposeJson(text) {
  console.log("JsonViewer: Your json was stored into 'window.json', enjoy!");
  var script = document.createElement("script") ;
  script.innerHTML = 'window.json = ' + text + ';';
  document.head.appendChild(script);
}

module.exports = exposeJson;
