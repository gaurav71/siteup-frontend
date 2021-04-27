const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", '.less'],
  },
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, './dist'),
    watchOptions: {
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /build/, /__test__/],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }), 
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};