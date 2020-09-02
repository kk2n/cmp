const path = require('path')
const argv = require('yargs').argv
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Pages = require('./src/router')
let entry = {}
let html = []
Pages.filter(page => page.publish).forEach(page => {
  page.url = page.url.replace('/', '')
  entry[`${page.url}/index`] = `./src/${page.url}/example.js`
  html.push(
    new HtmlWebpackPlugin({
      template: `src/index.html`,
      filename: `${page.url}/index.html`,
      chunks: [`${page.url}/index`],
      cache: false
    })
  )
})

module.exports = {
  devServer: {
    //设置多个服务目录
    contentBase: [path.join(__dirname, './src')],
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true
  },
  entry,
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [...html],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 如果想要启用 CSS 模块化，可以为 css-loader 添加 modules 参数即可
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000' },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  }
}
