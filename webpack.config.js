const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: !isProd && 'source-map',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [isProd ? new UglifyJsPlugin() : false].filter(Boolean)
};
