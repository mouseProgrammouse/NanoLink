import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: Configuration = {
  mode,
  entry: ['webpack-hot-middleware/client?reload=true', './src/client/index.ts'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};

export default config;
