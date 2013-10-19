//= require jquery.js
//= require jquery-serialize-object.js
//= require util.js
//= require_self

$(function() {

  var currentOptions = getOptions();

  var updateTheme = function(theme) {
    $(".themes-list span").remove();
    $(".themes-list a").removeClass("saved");
    var link = $("img[alt='" + theme + "']").parent();
    link.addClass("saved");
    link.append($("<span></span>", {text: "Saved"}));
  }

  var updateOptions = function(jsonOptions) {
    $.each(jsonOptions, function(key, value) {
      $("#" + key).val(value);
    });

    $(["awaysFold", "prependHeader"]).each(function(i, value) {
      if (jsonOptions[value] === "true") {
       $("#" + value).attr("checked", true);
      } else {
        delete currentOptions[value];
        delete jsonOptions[value];
      }
    });

    currentOptions = merge(currentOptions, jsonOptions);
    localStorage["options"] = JSON.stringify(currentOptions);
    updateTheme(currentOptions.theme);
  }

  $("form").on("submit", function(e) {
    e.preventDefault();
    updateOptions($("form").serializeObject());
  });

  $("form button[type='submit']").click(function(e) {
    e.preventDefault();
    updateOptions($("form").serializeObject());
  });

  $(".themes-list a").click(function(e) {
    e.preventDefault();
    var $this = $(this);
    var theme = $this.find("img").attr("alt");
    updateOptions(merge({"theme": theme}, $("form").serializeObject()));
  });

  updateOptions(currentOptions);
});
