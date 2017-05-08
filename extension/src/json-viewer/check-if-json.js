var extractJSON = require('./extract-json');
var getOptions = require('./viewer/get-options');

var FORCED_ENCODING = 'UTF-8';

function allTextNodes(nodes) {
  return Object.keys(nodes).reduce(function(result, key) {
    return result && nodes[key].nodeName === '#text'
  }, true)
}

function getPreWithSource() {
  var childNodes = document.body.childNodes;

  if (childNodes.length > 1 && allTextNodes(childNodes)) {
    if (process.env.NODE_ENV === 'development') {
      console.debug("[JSONViewer] Loaded from a multiple text nodes, normalizing");
    }

    document.body.normalize() // concatenates adjacent text nodes
  }

  if (childNodes.length === 1) {
    var childNode = childNodes[0];
    var nodeName = childNode.nodeName
    var textContent = childNode.textContent

    if (nodeName === "PRE") {
      return childNode;

    // if Content-Type is text/html
    } else if (nodeName === "#text" && textContent.trim().length > 0) {
      if (process.env.NODE_ENV === 'development') {
        console.debug("[JSONViewer] Loaded from a text node, this might have returned content-type: text/html");
      }

      var pre = document.createElement("pre");
      pre.textContent = textContent;
      document.body.removeChild(childNode);
      document.body.appendChild(pre);
      return pre;
    }
  }

  return null
}

function isJSON(jsonStr) {
  var str = jsonStr;
  if (!str || str.length === 0) {
    return false
  }

  str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
  str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  return (/^[\],:{}\s]*$/).test(str)
}

function isJSONP(jsonStr) {
  return isJSON(extractJSON(jsonStr));
}

function forceEncoding(pre, enc, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', window.location);
  xhr.overrideMimeType(document.contentType + '; charset=utf-8');
  xhr.onload = function() {
    pre.textContent = xhr.response;
    callback(pre);
    console.log('resource read as UTF-8 instead of ' + enc);
  }
  xhr.onerror = function() {
    // Make this fail quietly?
    console.log('resource could not be re-encoded due to network issue');
  }
  xhr.send()
}

function checkIfJson(sucessCallback, element) {
  var pre = element || getPreWithSource();
  if(pre === null || pre === undefined) return;
  var enc = document.characterSet;
  var callback = function(pre) { if(isJSON(pre.textContent) || isJSONP(pre.textContent)) sucessCallback(pre) }
  if(enc === FORCED_ENCODING) callback(pre);
  else {
      getOptions()
        .then(function(options) {
          if(options.addons.forceUTF8) forceEncoding(pre, enc, callback);
          else callback(pre);
        })
        .catch(function(e) {
          console.log('[JSONViewer] error: ' + e);
        });
    }
}


module.exports = checkIfJson;
