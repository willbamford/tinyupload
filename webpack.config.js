const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')

const env = process.env.NODE_ENV

const NAME = 'tinyupload'

const common = {
  entry: {
    main: path.resolve('./src')
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    library: NAME,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.glsl']
  },
  plugins: [
    new ExtractTextPlugin(`${NAME}.css`),
    new HtmlPlugin({ template: 'src/index.html', inject: 'head' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

const development = {
  output: {
    filename: `${NAME}.umd.js`
  },
  devServer: {
    compress: true,
    contentBase: '/',
    historyApiFallback: true,
    // hot: true,
    inline: true,
    port: 3000,
    stats: {
      chunks: false,
      colors: true
    }
  },
  devtool: 'source-map'
}

const production = {
  output: {
    filename: `${NAME}.umd.min.js`
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } })
  ]
}

const config = merge(
  common,
  env === 'production' ? production : development
)

module.exports = config
