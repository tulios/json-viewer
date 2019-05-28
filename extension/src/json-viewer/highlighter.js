var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/scroll/annotatescrollbar');
require('codemirror/addon/search/matchesonscrollbar');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/search/search');
require('codemirror/mode/javascript/javascript');
var merge = require('./merge');
var defaults = require('./options/defaults');
var URL_PATTERN = require('./url-pattern');
var F_LETTER = 70;

function Highlighter(jsonText, options) {
  this.options = options || {};
  this.text = jsonText;
  this.defaultSearch = false;
  this.theme = this.options.theme || "default";
  this.theme = this.theme.replace(/_/, ' ');
}

Highlighter.prototype = {
  highlight: function() {
    this.editor = CodeMirror(document.body, this.getEditorOptions());
    if (!this.alwaysRenderAllContent()) this.preventDefaultSearch();
    if (this.isReadOny()) this.getDOMEditor().className += ' read-only';

    this.bindRenderLine();
    this.bindMousedown();
    this.editor.refresh();
    this.editor.focus();
  },

  hide: function() {
    this.getDOMEditor().hidden = true;
    this.defaultSearch = true;
  },

  show: function() {
    this.getDOMEditor().hidden = false;
    this.defaultSearch = false;
  },

  getDOMEditor: function() {
    return document.getElementsByClassName('CodeMirror')[0];
  },

  fold: function() {
    var skippedRoot = false;
    var firstLine = this.editor.firstLine();
    var lastLine = this.editor.lastLine();

    for (var line = firstLine; line <= lastLine; line++) {
      if (!skippedRoot) {
        if (/(\[|\{)/.test(this.editor.getLine(line).trim())) skippedRoot = true;

      } else {
        this.editor.foldCode({line: line, ch: 0}, null, "fold");
      }
    }
  },

  unfoldAll: function() {
    for (var line = 0; line < this.editor.lineCount(); line++) {
      this.editor.foldCode({line: line, ch: 0}, null, "unfold");
    }
  },

  bindRenderLine: function() {
    var self = this;
    this.editor.off("renderLine");
    this.editor.on("renderLine", function(cm, line, element) {
      var elementsNode = element.getElementsByClassName("cm-string");
      if (!elementsNode || elementsNode.length === 0) return;

      var elements = [];
      for (var i = 0; i < elementsNode.length; i++) {
        elements.push(elementsNode[i]);
      }

      var textContent = elements.reduce(function(str, node) {
        return str += node.textContent;
      }, "");

      var text = self.removeQuotes(textContent);

      if (text.match(URL_PATTERN) && self.clickableUrls()) {
        var decodedText = self.decodeText(text);
        elements.forEach(function(node) {
          if (self.wrapLinkWithAnchorTag()) {
            var linkTag = document.createElement("a");
            linkTag.href = decodedText;
            linkTag.setAttribute('target', self.getLinkTarget());
            linkTag.classList.add("cm-string");

            // reparent the child nodes to preserve the cursor when editing
            node.childNodes.forEach(function(child) {
              linkTag.appendChild(child);
            });

            // block CodeMirror's contextmenu handler
            linkTag.addEventListener("contextmenu", function(e) {
              if (e.bubbles) e.cancelBubble = true;
            });

            node.appendChild(linkTag);
          } else {
            node.classList.add("cm-string-link");
            node.setAttribute("data-url", decodedText);
          }
        });
      }
    });
  },

  bindMousedown: function() {
    var self = this;
    this.editor.off("mousedown");
    this.editor.on("mousedown", function(cm, event) {
      var element = event.target;
      if (element.classList.contains("cm-string-link")) {
        var url = element.getAttribute("data-url")
        window.open(url, self.getLinkTarget());
      }
    });
  },

  removeQuotes: function(text) {
    return text.replace(/^\"+/, '').replace(/\"+$/, '');
  },

  includeQuotes: function(text) {
    return "\"" + text + "\"";
  },

  decodeText: function(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    return div.firstChild.nodeValue;
  },

  getEditorOptions: function() {
    var obligatory = {
      value: this.text,
      theme: this.theme,
      readOnly: this.isReadOny() ? true : false,
      mode: "application/ld+json",
      indentUnit: 2,
      tabSize: 2,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys: this.getExtraKeysMap()
    }

    if (this.alwaysRenderAllContent()) {
      obligatory.viewportMargin = Infinity;
    }

    var optional = defaults.structure;
    var configured = this.options.structure;

    return merge({}, optional, configured, obligatory);
  },

  getExtraKeysMap: function() {
    var extraKeyMap = {
      "Esc": function(cm) {
        CodeMirror.commands.clearSearch(cm);
        cm.setSelection(cm.getCursor());
        cm.focus();
      }
    }

    if (this.options.structure.readOnly) {
      extraKeyMap["Enter"] = function(cm) {
        CodeMirror.commands.findNext(cm);
      }

      extraKeyMap["Shift-Enter"] = function(cm) {
        CodeMirror.commands.findPrev(cm);
      }

      extraKeyMap["Ctrl-V"] = extraKeyMap["Cmd-V"] = function(cm) {};
    }

    var nativeSearch = this.alwaysRenderAllContent();
    extraKeyMap["Ctrl-F"] = nativeSearch ? false : this.openSearchDialog;
    extraKeyMap["Cmd-F"] = nativeSearch ? false : this.openSearchDialog;
    return extraKeyMap;
  },

  preventDefaultSearch: function() {
    document.addEventListener("keydown", function(e) {
      var metaKey = navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey;
      if (!this.defaultSearch && e.keyCode === F_LETTER && metaKey) {
        e.preventDefault();
      }
    }.bind(this), false);
  },

  openSearchDialog: function(cm) {
    cm.setCursor({line: 0, ch: 0});
    CodeMirror.commands.find(cm);
  },

  alwaysRenderAllContent: function() {
    // "awaysRenderAllContent" was a typo but to avoid any problems
    // I'll keep it a while
    return this.options.addons.alwaysRenderAllContent ||
           this.options.addons.awaysRenderAllContent;
  },

  clickableUrls: function() {
    return this.options.addons.clickableUrls;
  },

  wrapLinkWithAnchorTag: function() {
    return this.options.addons.wrapLinkWithAnchorTag;
  },

  openLinksInNewWindow: function() {
    return this.options.addons.openLinksInNewWindow;
  },

  getLinkTarget: function() {
    return this.openLinksInNewWindow() ? "_blank" : "_self";
  },

  isReadOny: function() {
    return this.options.structure.readOnly;
  }
}

module.exports = Highlighter;
