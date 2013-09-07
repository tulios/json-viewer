//= require jquery.js
//= require_self

$(function() {

  var currentTheme = localStorage["theme"] || "default";

  var updateTheme = function(theme) {
    $(".themes-list span").remove();
    $(".themes-list a").removeClass("saved");
    var link = $("img[alt='" + theme + "']").parent();
    link.addClass("saved");
    link.append($("<span></span>", {text: "Saved"}));
    localStorage["theme"] = theme;
  }

  $(".themes-list a").click(function(e) {
    e.preventDefault();
    var $this = $(this);
    var theme = $this.find("img").attr("alt");
    updateTheme(theme);
  });

  updateTheme(currentTheme);

});
