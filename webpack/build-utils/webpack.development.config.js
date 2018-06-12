const webpack = require('webpack');

module.exports = () => ({
  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      }
    ],
  },

  plugins: [
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 3001,
    proxy: {
      "/upload": "http://localhost:3000"
    }
  }
});
