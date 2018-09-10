const { DefinePlugin } = require("webpack");
const MergePlugin = require("webpack-merge");

const packageInfo = require("../package");
const baseConfig = require("./webpack.config.js");

const dependencies = Object.assign({}, packageInfo.dependencies);

module.exports = MergePlugin(baseConfig, {
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  mode: "development"
});
