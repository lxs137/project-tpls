const fs = require("fs");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const packageInfo = require("../package");
const dependencies = Object.assign({}, packageInfo.dependencies);

function requireAll(array) {
  // https://stackoverflow.com/a/34574630/1559386
  return array.map(require.resolve);
}

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index.tsx"),
    vendor: Object.keys(dependencies)
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  },

  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.resolve(__dirname, "../src"), 
      "node_modules"
    ],
    plugins: [
      new TsconfigPathsPlugin({ 
        configFile: path.resolve(__dirname, "../tsconfig.json") })
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: requireAll([
              "babel-preset-es2015",
              "babel-preset-react"
            ])
          }
        }
      },
      {
        test: /\.css$/,
        use: [
        process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: path.join(__dirname, "../postcss.config.js")
            }
          }
        }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif|ico|icns)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./[hash]-[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.raml$/,
        loader: "raml-validator-loader"
      }
    ]
  },

  devServer: {
    // TODO: https://webpack.js.org/configuration/dev-server/#devserver-hot
    contentBase: path.join(__dirname, "../dist"),
    open: false,
    overlay: true,
    host: "127.0.0.1",
    port: 4000
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === "development" ? "[name].css" : "[name].[hash].css",
      chunkFilename: process.env.NODE_ENV === "development" ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      hash: process.env.NODE_ENV === "production"
    })
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};