var defaults = require('./options/defaults');
var NAMESPACE = "v2.options";

module.exports = {
  save: function(obj) {
    localStorage.setItem(NAMESPACE, JSON.stringify(obj));
  },

  load: function() {
    var options = localStorage.getItem(NAMESPACE);
    options = options ? JSON.parse(options) : {};

    options.theme = options.theme || defaults.theme;
    options.structure = options.structure ? JSON.parse(options.structure) : defaults.structure;
    options.style = options.style && options.style.length > 0 ? options.style : defaults.style;
    return options;
  }
}
