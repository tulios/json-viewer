function bindSaveButton(onSaveClicked) {
  var saveButton = document.getElementById("save");
  saveButton.onclick = function() {

    var output = {};
    var form = document.getElementById("options");
    form.onsubmit = function() { return false; }

    for (var i = 0; i < form.elements.length; i++) {
       var e = form.elements[i];
       if (!/-example$/.test(e.name) && e.name.length !== 0) {
         output[e.name] = e.value;
       }
    }

    onSaveClicked(output);

  }
}

module.exports = bindSaveButton;
