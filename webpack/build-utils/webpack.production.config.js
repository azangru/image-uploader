const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => ({

  output: {
    filename: '[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id]-[contenthash].css"
    }),
    new UglifyJsPlugin()
  ]
});
