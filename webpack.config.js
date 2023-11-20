const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

module.exports = {
  entry: './src/script.js', // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    })
  ],
};
