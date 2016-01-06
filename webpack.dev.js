var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var Html = require('html-webpack-plugin');
var pkg = require('./package.json');

console.log('version : ' + pkg.version);

module.exports = {
  content: __dirname,
  entry: {
    'app': './app/app.js'
  },
  output: {
    path: './dist',
    filename: 'static/[name].bindle.js',
    publicPath: '.'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|web_components)/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    new Clean(['./dist']),
    new webpack.NoErrorsPlugin(),
    new Html({
      filename: 'index.html',
      title: 'me',
      template: './app/public/views/template.html'
    })
  ]
}
