var defaults = require('./options/defaults');

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
    options.addons = options.addons ? JSON.parse(options.addons) : defaults.addons;
    options.structure = options.structure ? JSON.parse(options.structure) : defaults.structure;
    options.style = options.style && options.style.length > 0 ? options.style : defaults.style;
    return options;
  },

  restoreOldOptions: function(optionsStr) {
    var oldOptions = localStorage.getItem(OLD_NAMESPACE);
    var options = null;

    if (optionsStr === null && oldOptions !== null) {
      oldOptions = JSON.parse(oldOptions);
      options = {};
      options.theme = oldOptions.theme;
      options.addons = {
        prependHeader: oldOptions.prependHeader,
        maxJsonSize: parseInt(oldOptions.maxJsonSize, 10)
      }

      // Update to at least the new max value
      if (options.addons.maxJsonSize < defaults.addons.maxJsonSize) {
        options.addons.maxJsonSize = defaults.addons.maxJsonSize;
      }

      options.addons = JSON.stringify(options.addons);
      options.structure = JSON.stringify(defaults.structure);
      options.style = defaults.style;
      this.save(options);

      localStorage.removeItem(OLD_NAMESPACE);
      optionsStr = JSON.stringify(options);
    }

    return optionsStr;
  }
}
