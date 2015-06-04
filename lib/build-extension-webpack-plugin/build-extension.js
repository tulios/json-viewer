var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');

var SRC_ROOT = path.join(__dirname, '../../extension');
var BUILD_DIR = path.join(__dirname, '../../build');
var EXTENSION = path.join(BUILD_DIR, 'json_viewer');

function BuildExtension() {}
BuildExtension.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('\n');
    console.log('-> copying files');
    fs.copySync(path.join(SRC_ROOT, 'icons'),         path.join(EXTENSION, 'icons'));
    fs.copySync(path.join(SRC_ROOT, 'manifest.json'), path.join(EXTENSION, 'manifest.json'));

    console.log('-> zipping');
    var output = fs.createOutputStream(path.join(BUILD_DIR, 'json_viewer.zip'));
    var archive = archiver('zip');

    archive.pipe(output);
    archive.bulk([
      { expand: true, cwd: EXTENSION, src: ['**'] }
    ]);
    archive.finalize();

    console.log('-> done');

  });
}

module.exports = BuildExtension;
