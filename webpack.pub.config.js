const path = require('path')
const webpack = require('webpack')
let argv = require('yargs').argv
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Pages = require('./src/router')
// const { last } = require('underscore')
let entry = {}
let moveFile = []
Pages.filter(page => page.publish).forEach(page => {
  page.url = page.url.replace('/', '')
  entry[`${page.url}`] = `./src/${page.url}`
  moveFile.push({ from: `./src/${page.url}/index.js`, to: `./${page.url}/es/index.js` })
  moveFile.push({ from: `./src/lib/style/index.js`, to: `./${page.url}/style/index.js` })
})
module.exports = {
  // optimization: {
  //   //minimize: true
  // },
  entry,
  output: {
    path: path.join(__dirname, './'),
    filename: '[name]/index.js',
    libraryTarget: 'umd', //发布组件专用
    library: ''
  },
  plugins: [
    // 插件
    new CopyWebpackPlugin(moveFile, {}),
    new ExtractTextPlugin('[name]/index.css'),
    new OptimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: false //是否将插件信息打印到控制台
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader'],
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'
      },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                modifyVars: {},
                javascriptEnabled: true
              }
            }
          ],
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: require.resolve('react'),
        use: [
          {
            loader: 'expose-loader',
            options: 'React'
          }
        ]
      }
    ]
  }
}
