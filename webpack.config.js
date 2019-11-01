const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath : '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // options...
              }
            }
          ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: "[name].[ext]",
                outputPath: 'webfonts'
            }
        }]
    },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
  ]
}
