var path = require("path");
var fs = require('fs-extra');
var webpack = require("webpack");
var Clean = require("clean-webpack-plugin");
var BuildExtension = require("./lib/build-extension-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var entries = {
  viewer: ["./extension/src/viewer.js"],
  options: ["./extension/src/options.js"]
};

var themesList = fs.readdirSync(path.join('extension', 'themes')).
  filter(function(filename) {
    return /\.js$/.test(filename);
  }).
  map(function(theme) {
    return theme.replace(/\.js$/, '');
  });

themesList.forEach(function(filename) {
  entries[filename] = ["./extension/themes/" + filename + ".js"];
});

console.log("Entries list:");
console.log(entries);
console.log("\n");

module.exports = {
  debug: false,
  context: __dirname,
  entry: entries,
  themes: themesList,
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
    new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        THEMES: JSON.stringify(themesList)
      }
    }),
    new BuildExtension()
  ]
};
