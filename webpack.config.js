const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/code-viewer.js',
  output: {
    path: __dirname + '/dist',
    filename: 'code-viewer.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
