var sweetAlert = require('sweetalert2');
var defaults = require('./defaults');
var Storage = require('../storage');

function bindResetButton() {
  var button = document.getElementById("reset");
  button.onclick = function(e) {
    e.preventDefault();

    sweetAlert({
      title: "Are you sure?",
      text: "You will not be able to recover your custom settings",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, reset!",
      showLoaderOnConfirm: true,
      preConfirm: function() {
        var options = {};
        options.theme = defaults.theme;
        options.addons = JSON.stringify(defaults.addons);
        options.structure = JSON.stringify(defaults.structure);
        options.style = defaults.style;

        Storage.save(options);

        return new Promise(() => {
          document.location.reload();
        })
      }
    });
  }
}

module.exports = bindResetButton;
