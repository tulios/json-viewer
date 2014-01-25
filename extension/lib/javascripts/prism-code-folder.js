/*
 * Prism Code Folder
 * https://github.com/tulios/json-viewer/tree/master/extension/lib/javascripts/prism-code-folder.js
 */

(function(){

  if(!window.Prism) {
    return;
  }

  function wrap(code, awaysFold) {
    var div = document.createElement('div');
    div.innerHTML = code;

    var output = document.createElement('div');
    var node = div.firstChild;
    var stack = [];

    var mainNodePrinted = false;
    var startClass = awaysFold ? "closed" : "open";

    while(node) {
      if (/openner/.test(node.className)) {
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper " + (!mainNodePrinted ? "open" : startClass);

        var context = stack.length > 0 ? stack[stack.length - 1] : output;
        var newNode = node.cloneNode(true);

        var handle = document.createElement("a");
        handle.className = newNode.className + " handle";
        handle.href = "#";
        handle.textContent = newNode.textContent;

        var closeText = "...}";
        if (node.textContent === "[") {
          closeText = "...]";
        }

        var closeMarkup = document.createElement("span");
        closeMarkup.className = "token punctuation closer-token";

        if (mainNodePrinted && startClass === "closed") {
          closeMarkup.className += " enabled";
        }

        closeMarkup.textContent = closeText;

        var arrowMarkup = document.createElement("span");
        var arrowClass = awaysFold && mainNodePrinted ? "arrow-up" : "arrow-down";
        arrowMarkup.className = "json_viewer " + arrowClass;

        handle.appendChild(arrowMarkup);
        handle.appendChild(closeMarkup);
        context.appendChild(handle);

        stack.push(wrapper);

        if (!mainNodePrinted) {
          mainNodePrinted = true;
        }

      } else if (/closer/.test(node.className)) {
        var wrapper = stack.pop();
        wrapper.appendChild(node.cloneNode(true));

        var context = stack.length > 0 ? stack[stack.length - 1] : output;
        context.appendChild(wrapper);

      } else if (stack.length > 0) {
        var wrapper = stack[stack.length - 1];
        wrapper.appendChild(node.cloneNode(true));

      } else {
        output.appendChild(node.cloneNode(true));
      }

      node = node.nextSibling;
    }

    return output.innerHTML;
  }

  Prism.hooks.add('wrap', function(env) {
  	if (/punctuation/.test(env.type) && ['[', '{'].indexOf(env.content) > -1) {
      env.classes.push("openner");

    } else if (/punctuation/.test(env.type) && [']', '}'].indexOf(env.content) > -1){
      env.classes.push("closer");
    }
  });

  Prism.hooks.add('before-insert', function(env) {
    var pre = env.element.parentNode;
    var awaysFold = (pre && pre.hasAttribute('data-aways-fold'));
    env.highlightedCode = wrap(env.highlightedCode, awaysFold);
  });

  Prism.applyCodeFold = function() {
    document.addEventListener('click', function(e) {
      var element = e.toElement;
      if (!(/handle/.test(element.className) || /handle/.test(element.parentElement.className))) {
        return;
      }

      if (/handle/.test(element.parentElement.className)) {
        element = element.parentElement;
      }

      e.preventDefault();
      var wrapper = element.nextSibling;
      var label = element.querySelectorAll("span.closer-token")[0];
      var arrow = element.querySelectorAll("span.json_viewer")[0];
      var isOpen = /open/.test(wrapper.className);

      if (isOpen) {
        wrapper.className = wrapper.className.replace(/\s*open\s*/, ' closed');
        label.className = (label.className + " enabled");
        arrow.className = arrow.className.replace(/\s*arrow-down\s*/, ' arrow-up');

      } else {
        wrapper.className = wrapper.className.replace(/\s*closed\s*/, ' open');
        label.className = label.className.replace(/\s*enabled\s*/, '');
        arrow.className = arrow.className.replace(/\s*arrow-up\s*/, ' arrow-down');
      }

      return false;
    }, false);
  }

  Prism.hooks.add('after-highlight', function(env) {
    Prism.applyCodeFold();
  });

})();
