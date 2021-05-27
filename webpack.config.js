const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.join(__dirname, "/public/js/admin"),
    filename: "main_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|tiff)$/,
        use: [
            'file-loader?name=assets/[name].[ext]'
        ]
      },
      {
         test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
         use: ['file-loader']
       }
    ]
  },
  plugins: [
  ]
};
