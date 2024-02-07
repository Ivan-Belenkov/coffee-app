const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';

/**
 * @param {...string} parts
 * @returns {string}
 */
function resolvePath(...parts) {
  return path.resolve(__dirname, ...parts);
}

module.exports = {
  entry: {
    app: resolvePath('src', 'main.ts')
  },

  resolve: {
    alias: {
      svelte: resolvePath('node_modules', 'svelte/src/runtime'),
      src: resolvePath('src')
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser']
  },

  output: {
    path: resolvePath('dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[contenthash].js' : '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !isProd
            },
            emitCss: isProd,
            hotReload: !isProd,
            preprocess: sveltePreprocess({ sourceMap: !isProd })
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('src', 'index.html'),
      favicon: resolvePath('src', 'favicon.ico')
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[name].[contenthash].css' : '[name].css'
    })
  ],

  mode,
  devtool: isProd ? false : 'source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 9000
  }
};
