function bindSaveButton(editors, onSaveClicked) {
  var form = document.getElementById("options");
  form.onsubmit = function() { return false; }

  var saveButton = document.getElementById("save");
  saveButton.onclick = function(e) {
    e.preventDefault();

    var output = {};
    editors.forEach(function(editor) {
      editor.save();
    });

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
