const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = (env, mode) => require(`./build-utils/webpack.${mode}.config`)(env);

module.exports = (env) => {
  const { mode } = env;

  const commonConfig = {
    mode,
    entry: {
      app: path.resolve(__dirname, '../client/index.js')
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        ...process.env
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../client/index.html')
      }),
    ]
  };

  return webpackMerge(
    commonConfig,
    modeConfig(env, mode)
  );
};
