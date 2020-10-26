const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

// Commonly used webpack config
module.exports = {
  // 1 the entry file(s)
  entry: {
    main: {
      import: './src/index.ts',
      dependOn: 'shared',
    },
    vendor: {
      import: './src/vendor.ts',
      dependOn: 'shared',
    },
    shared: ['lodash'],
  },
  // 2 the output file(s)
  output: {
    // NodeJs relative path resolver
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
    }),
  ],
  module: {
    rules: [
      // Typescript rules
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Babel rules
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Scss loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              hmr: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      // Image loader
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // Webpack5 assets loader
      {
        test: /\.(jpeg|png|svg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};