var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');
var BuildPaths = require('../build-paths');

function BuildExtension() {}
BuildExtension.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('\n');
    console.log('-> copying files');
    fs.copySync(path.join(BuildPaths.SRC_ROOT, 'icons'), path.join(BuildPaths.EXTENSION, 'icons'));
    fs.copySync(path.join(BuildPaths.SRC_ROOT, 'pages'), path.join(BuildPaths.EXTENSION, 'pages'));

    console.log('-> copying themes');

    var themesCSSPaths = [];
    compiler.options.themes.forEach(function(theme) {
      var themeCSS = theme.replace(/\.js$/, '.css');
      var themeCSSPath = 'themes/' + theme + '.css';
      var themePath = path.join(BuildPaths.EXTENSION, 'assets/' + theme);

      if (fs.existsSync(themePath + '.js') && fs.existsSync(themePath + '.css')) {
        fs.removeSync(themePath + '.js');
        fs.copySync(themePath + '.css', path.join(BuildPaths.EXTENSION, themeCSSPath));
        console.log('  copied: ' + themeCSSPath);
        themesCSSPaths.push(themeCSSPath);

      } else {
        console.error('  fail to copy: ' + (themePath + '.css'));
      }
    });

    var manifest = fs.readJSONSync(path.join(BuildPaths.SRC_ROOT, 'manifest.json'));
    manifest.web_accessible_resources = manifest.web_accessible_resources.concat(themesCSSPaths);

    console.log('-> copying manifest.json');
    fs.outputJSONSync(path.join(BuildPaths.EXTENSION, 'manifest.json'), manifest);
  });
}

module.exports = BuildExtension;
