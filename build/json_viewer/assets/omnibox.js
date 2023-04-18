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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(69);


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

	module.exports = chrome;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	var chrome = __webpack_require__(8);

	chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	  console.log('[JSONViewer] inputChanged: ' + text);
	  suggest([
	    {
	      content: "Format JSON",
	      description: "(Format JSON) Open a page with json highlighted"
	    },
	    {
	      content: "Scratch pad",
	      description: "(Scratch pad) Area to write and format/highlight JSON"
	    }
	  ]);
	});

	chrome.omnibox.onInputEntered.addListener(function(text) {
	  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var omniboxUrl = chrome.extension.getURL("/pages/omnibox.html");
	    var path = /scratch pad/i.test(text) ? "?scratch-page=true" : "?json=" + encodeURIComponent(text);
	    var url = omniboxUrl + path;
	    console.log("[JSONViewer] Opening: " + url);

	    chrome.tabs.update(tabs[0].id, {url: url});
	  });
	});


/***/ })

/******/ });