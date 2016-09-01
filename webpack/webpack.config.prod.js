/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, '..', 'public', 'assets');

module.exports = {
  entry: path.join(__dirname, '../app/index.jsx'),
  devtool: 'source-map',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ]
};

