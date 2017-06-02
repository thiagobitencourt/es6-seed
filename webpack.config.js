'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Generate the index.html
const packageJson = require('./package');

let config = {
  entry: './src/app/app.module.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.module.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.html$/, 
        loader: 'html-loader',
        exclude: [
          /index\.html$/
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ES6-SEED',
      version: packageJson.version,
      name: packageJson.name,
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // A directory or URL to server HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload))
    open: true // open default browser while lauching
  },
  devtool: 'source-map'
}

module.exports = config;

if(process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}