/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var chrome = __webpack_require__(8);
	var Storage = __webpack_require__(9);

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	  try {
	    if (request.action === "GET_OPTIONS") {
	      sendResponse({err: null, value: Storage.load()});
	    }
	  } catch(e) {
	    console.error('[JSONViewer] error: ' + e.message, e);
	    sendResponse({err: e});
	  }
	});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = chrome;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(10);
	var merge = __webpack_require__(11);

	var OLD_NAMESPACE = "options";
	var NAMESPACE = "v2.options";

	module.exports = {
	  save: function(obj) {
	    localStorage.setItem(NAMESPACE, JSON.stringify(obj));
	  },

	  load: function() {
	    var optionsStr = localStorage.getItem(NAMESPACE);
	    optionsStr = this.restoreOldOptions(optionsStr);

	    options = optionsStr ? JSON.parse(optionsStr) : {};
	    options.theme = options.theme || defaults.theme;
	    options.addons = options.addons ? JSON.parse(options.addons) : {};
	    options.addons = merge({}, defaults.addons, options.addons)
	    options.structure = options.structure ? JSON.parse(options.structure) : defaults.structure;
	    options.style = options.style && options.style.length > 0 ? options.style : defaults.style;
	    return options;
	  },

	  restoreOldOptions: function(optionsStr) {
	    var oldOptions = localStorage.getItem(OLD_NAMESPACE);
	    var options = null;

	    if (optionsStr === null && oldOptions !== null) {
	      try {
	        oldOptions = JSON.parse(oldOptions);
	        if(!oldOptions || typeof oldOptions !== "object") oldOptions = {};

	        options = {};
	        options.theme = oldOptions.theme;
	        options.addons = {
	          prependHeader: JSON.parse(oldOptions.prependHeader || defaults.addons.prependHeader),
	          maxJsonSize: parseInt(oldOptions.maxJsonSize || defaults.addons.maxJsonSize, 10)
	        }

	        // Update to at least the new max value
	        if (options.addons.maxJsonSize < defaults.addons.maxJsonSize) {
	          options.addons.maxJsonSize = defaults.addons.maxJsonSize;
	        }

	        options.addons = JSON.stringify(options.addons);
	        options.structure = JSON.stringify(defaults.structure);
	        options.style = defaults.style;
	        this.save(options);

	        optionsStr = JSON.stringify(options);

	      } catch(e) {
	        console.error('[JSONViewer] error: ' + e.message, e);

	      } finally {
	        localStorage.removeItem(OLD_NAMESPACE);
	      }
	    }

	    return optionsStr;
	  }
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = {
	  theme: "default",
	  addons: {
	    prependHeader: true,
	    maxJsonSize: 400,
	    alwaysFold: false,
	    alwaysRenderAllContent: false,
	    sortKeys: false,
	    clickableUrls: true,
	    wrapLinkWithAnchorTag: false,
	    openLinksInNewWindow: true,
	    autoHighlight: true
	  },
	  structure: {
	    readOnly: true,
	    lineNumbers: true,
	    lineWrapping: true,
	    foldGutter: true,
	    tabSize: 2,
	    indentCStyle: false,
	    showArraySize: false
	  },
	  style: [
	    ".CodeMirror {",
	    "  font-family: monaco, Consolas, Menlo, Courier, monospace;",
	    "  font-size: 16px;",
	    "  line-height: 1.5em;",
	    "}"
	  ].join('\n')
	}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	function merge() {
	  var obj = {}, i = 0, il = arguments.length, key;
	  if (il === 0) {
	    return obj;
	  }

	  for (; i < il; i++) {
	    for (key in arguments[i]) {
	      if (arguments[i].hasOwnProperty(key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }
	  return obj;
	}

	module.exports = merge;


/***/ })
/******/ ]);