var path = require('path')
module.exports = {
  entry: './srctest/app.js',
  output: {
    path: path.resolve(__dirname, 'buildtest'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'srctest')],
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'buildtest'),
    compress: true,
    port: 9000
  }
}
