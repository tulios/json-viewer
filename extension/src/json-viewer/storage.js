var defaults = require('./options/defaults');
var merge = require('./merge');

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
