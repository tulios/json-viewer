var path = require("path");
var fs = require('fs-extra');
var webpack = require("webpack");
var Clean = require("clean-webpack-plugin");
var BuildPaths = require("./lib/build-paths");
var BuildExtension = require("./lib/build-extension-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var manifest = fs.readJSONSync(path.join(BuildPaths.SRC_ROOT, 'manifest.json'));
var version = manifest.version;

var entries = {
  viewer: ["./extension/src/viewer.js"],
  "viewer-alert": ["./extension/styles/viewer-alert.scss"],
  options: ["./extension/src/options.js"],
  backend: ["./extension/src/backend.js"],
  omnibox: ["./extension/src/omnibox.js"],
  "omnibox-page": ["./extension/src/omnibox-page.js"]
};

function findThemes(darkness) {
  return fs.readdirSync(path.join('extension', 'themes', darkness)).
    filter(function(filename) {
      return /\.js$/.test(filename);
    }).
    map(function(theme) {
      return theme.replace(/\.js$/, '');
    });
}

function includeThemes(darkness, list) {
  list.forEach(function(filename) {
    entries[filename] = ["./extension/themes/" + darkness + "/" + filename + ".js"];
  });
}

var lightThemes = findThemes('light');
var darkThemes = findThemes('dark');
var themes = {light: lightThemes, dark: darkThemes};

includeThemes('light', lightThemes);
includeThemes('dark', darkThemes);

console.log("Entries list:");
console.log(entries);
console.log("\n");

var manifest = {
  debug: false,
  context: __dirname,
  entry: entries,
  themes: themes,
  output: {
    path: path.join(__dirname, "build/json_viewer/assets"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    root: path.resolve(__dirname, './extension'),
  },
  externals: [
    {
      "chrome-framework": "chrome"
    }
  ],
  plugins: [
    new Clean(["build"]),
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VERSION: JSON.stringify(version),
        THEMES: JSON.stringify(themes)
      }
    }),
    new BuildExtension()
  ]
};

if (process.env.NODE_ENV === 'production') {
  manifest.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: false}));
  manifest.plugins.push(new webpack.optimize.DedupePlugin());
  manifest.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = manifest;
