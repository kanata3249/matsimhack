const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'main.js',
    libraryTarget: 'umd'

  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/index.html',
        },
      ]
    })
  ]
}