const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

// Merge webpack dev config with common configs
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    liveReload: true,
    open: true,
    port: 8080,
  },
});
