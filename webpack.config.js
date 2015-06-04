var path = require("path");
var webpack = require("webpack");
var Clean = require("clean-webpack-plugin");
var BuildExtension = require("./lib/build-extension-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  debug: false,
  context: __dirname,
  entry: {
    viewer: ["./extension/src/viewer.js"]
  },
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
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new BuildExtension()
  ]
};
