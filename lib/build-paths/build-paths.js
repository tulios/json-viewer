var path = require('path');
var buildDir = path.join(__dirname, '../../build');

module.exports = {
  SRC_ROOT:  path.join(__dirname, '../../extension'),
  BUILD_DIR: buildDir,
  RELEASE_DIR: path.join(__dirname, '../../pkg'),
  EXTENSION: path.join(buildDir, 'json_viewer')
}
