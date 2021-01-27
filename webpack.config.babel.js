import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ENV } from '~/configuration/environment';

// constants

const Dotenv = require('dotenv-webpack');
const NODE_ENV = process.env.NODE_ENV || 'production';
const TEMPLATE_FILE = path.resolve('src', 'index.html');
const APP_ENTRY_FILE = path.resolve('src', 'index.jsx');
const THEME_PATH = path.resolve('src', 'theme');
const OUTPUT_PATH = path.resolve('docs');
const ASSETS_PATH = path.resolve('assets');

// plugins =====================================================================

let templatePlugin = new HtmlWebpackPlugin({
  template: TEMPLATE_FILE,
  inject: 'body'
});

let hotReloaderPlugin = new webpack.HotModuleReplacementPlugin();
let useEnvironmentVariables = new webpack.DefinePlugin({ ...ENV });

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// config ======================================================================

let config = {
  entry: {
    app: ['babel-polyfill', APP_ENTRY_FILE]
  },
  mode: 'production',
  node: {
    fs: 'empty'
  }, // required to get dotenv to work, otherwise it throws an fs not defined error
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      theme: THEME_PATH
    }
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js'
  },
  plugins: [
    //useEnvironmentVariables,
    new webpack.DefinePlugin({
      'process.env.REACT_APP_AIRTABLE_API_KEY': JSON.stringify(
        process.env.REACT_APP_AIRTABLE_API_KEY
      ),
      'process.env.REACT_APP_GOOGLE_ANALYTICS_ID': JSON.stringify(
        process.env.REACT_APP_GOOGLE_ANALYTICS_ID
      )
    }),
    templatePlugin,
    new Dotenv(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: {
          loader: 'yaml-import-loader'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader?insertAt=top',
          'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:4]',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 50000 // make sure this number is big enough to load your resource, or do not define it at all.
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  }
};

if (NODE_ENV === 'development') {
  config.mode = 'development';
  config.devtool = 'source-map';
  config.entry.hot = [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
  ];
  config.plugins.push(hotReloaderPlugin);
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: 'styles.css'
    })
  );
  config.plugins.push(
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  );
}

export default config;
