'use strict';

var path = require('path');
var webpack = require('webpack');

// for local tesing of compressed files
var ENV = {
  __BUILD__ : {
    PRODUCTION : false,
    DEVELOP : false,
    STAGING : true,

    BASE_URL : JSON.stringify("http://localhost:3000"),
    API_URL : JSON.stringify("http://localhost:3000"),
    STATIC_ASSETS_URL : JSON.stringify("http://cdn.qri.io"),
    SEGMENT_KEY : JSON.stringify("test"),
  }
};

function exitOneFail() {
  this.plugin("done", function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length) {
      console.log(stats.compilation.errors);
      process.exit(1);
    }
  });
}

console.log(ENV);

module.exports = {
  entry: {
    'app' : './src/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath : "http://cdn.qri.io/js/",
    filename: '[name].staging.js',
    chunkFilename: "[name].chunk.js"
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(ENV),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    exitOneFail,
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  }
};