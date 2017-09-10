import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {

  debug: true,

  devtool: 'source-map',

  noInfo: false,

  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },

  target: 'web',

  output: {

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/',

    filename: '[name].[chunkhash].js'

  },

  plugins: [
    //Gera um arquivo css externo com um hash no nome
    new ExtractTextPlugin('[name].[contenthash].css'),

    //Cria um hash MD5 dos arquivos JS, assim o nome do arquivo só mudará quando o arquivo mudar
    new WebpackMd5Hash(),

    //Plugin utilizado para criar um pacote separado de JS, assim eles podem ser cacheados separadamente
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //Cria um arquivo HTML que já inclui a referencia para o bundle JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      trackJSToken: 'f9fc3ed8d06e4f2c84cbcee142014f0d',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    //Elimina packages duplicados ao gerar o bundle
    new webpack.optimize.DedupePlugin(),

    //Minifica o JS
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {

    loaders: [

      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }

}
