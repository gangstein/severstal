const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/data'),
          to: path.resolve(__dirname, 'dist/data'),
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8090
  },
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};