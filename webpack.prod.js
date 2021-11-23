const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ],
});
