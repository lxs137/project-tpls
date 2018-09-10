const { DefinePlugin, optimize } = require("webpack");
const { ModuleConcatenationPlugin } = optimize;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MergePlugin = require("webpack-merge");

const packageInfo = require("../package");
const baseConfig = require("./webpack.config.js");

module.exports = MergePlugin(baseConfig, {
  devtool: "source-map",
  plugins: [
    new ModuleConcatenationPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.version": JSON.stringify(packageInfo.version)
    }),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false,
          ie8: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      },
      sourceMap: true
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  mode: "production"
});
