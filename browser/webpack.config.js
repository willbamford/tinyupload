const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const env = process.env.NODE_ENV

const common = {
  entry: {
    main: './src'
  },
  output: {
    path: './dist',
    publicPath: '/',
    library: 'tinyupload',
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
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.glsl']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

const development = {
  output: {
    filename: `tinyupload.umd.js`
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
    filename: `tinyupload.umd.min.js`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } })
  ]
}

const config = merge(
  common,
  env === 'production'
    ? production
    : development
)

module.exports = config
