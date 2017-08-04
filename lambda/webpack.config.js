const path = require('path')
// const version = require('./package.json').version
module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: ['aws-sdk']
}
