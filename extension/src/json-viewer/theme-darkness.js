var themes = process.env.THEMES;
module.exports = function(name) {
  var darkness = "light";
  if (themes.dark.indexOf(name) !== -1) darkness = "dark";

  return darkness;
}
