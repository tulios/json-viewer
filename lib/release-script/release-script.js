var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');
var BuildPaths = require('../build-paths');

console.log('-> clean up');

var themes = fs.readdirSync(path.join(BuildPaths.EXTENSION, 'themes'));
console.log('-> ' + (themes.length + 1) + ' themes'); // +1 for default

fs.readdirSync(path.join(BuildPaths.EXTENSION, 'assets')).forEach(function(filename) {
  if (themes.indexOf(filename) !== -1) {
    console.log('  removed: assets/' + filename);
    fs.removeSync(path.join(BuildPaths.EXTENSION, 'assets/' + filename));
  }
});

console.log('-> zipping');
var zipName = 'json_viewer.zip';
var zipPath = path.join(BuildPaths.BUILD_DIR, zipName);
var output = fs.createOutputStream(zipPath);
var archive = archiver('zip');

archive.pipe(output);
archive.bulk([
  { expand: true, cwd: BuildPaths.EXTENSION, src: ['**'] }
]);

archive.on("finish", function() {
  var manifest = fs.readJSONSync(path.join(BuildPaths.EXTENSION, 'manifest.json'));
  var version = manifest.version;

  console.log('-> finishing version: ' + version);
  fs.copySync(zipPath, path.join(BuildPaths.RELEASE_DIR, version + '/' + zipName));
  console.log('-> done');
});

archive.finalize();
