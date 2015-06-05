var path = require('path');
var buildDir = path.join(__dirname, '../../build');

module.exports = {
  SRC_ROOT:  path.join(__dirname, '../../extension'),
  BUILD_DIR: buildDir,
  EXTENSION: path.join(buildDir, 'json_viewer')
}
