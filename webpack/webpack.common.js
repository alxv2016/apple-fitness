const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

// Common webpack config
module.exports = {
  context: paths.src,
  entry: {
    app: {
      import: `${paths.src}/index.ts`,
      dependOn: 'vendors',
    },
    vendors: ['axios', 'gsap'],
  },
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.js'],
    alias: {
      '@': paths.src,
      public: paths.public,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: `${paths.src}/template.html`,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new Dotenv({
      path: './.env',
      systemvars: true,
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
      // Scss loader
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
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
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
