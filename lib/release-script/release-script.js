var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');
var BuildPaths = require('../build-paths');

console.log('-> clean up');

var themes = fs.readdirSync(path.join(BuildPaths.EXTENSION, 'themes'));
fs.readdirSync(path.join(BuildPaths.EXTENSION, 'assets')).forEach(function(filename) {
  if (themes.indexOf(filename) !== -1) {
    console.log('  removed: assets/' + filename);
    fs.removeSync(path.join(BuildPaths.EXTENSION, 'assets/' + filename));
  }
});

console.log('-> zipping');
var output = fs.createOutputStream(path.join(BuildPaths.BUILD_DIR, 'json_viewer.zip'));
var archive = archiver('zip');

archive.pipe(output);
archive.bulk([
  { expand: true, cwd: BuildPaths.EXTENSION, src: ['**'] }
]);
archive.finalize();

console.log('-> done');
