var path = require('path');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, '..', 'public', 'assets');

module.exports = {
  entry: path.join(__dirname, '../app/index.js'),
  devtool: 'eval-source-map',
  output: {
    path: assetsPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: path.join(__dirname, '..', 'node_modules')
    }]
  },
};

