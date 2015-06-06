var NAMESPACE = "v2.options";

module.exports = {
  save: function(obj) {
    localStorage.setItem(NAMESPACE, JSON.stringify(obj));
  },

  load: function() {
    return localStorage.getItem(NAMESPACE) || {};
  }
}
