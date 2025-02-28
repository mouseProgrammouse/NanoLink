import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';

const config: Configuration = {
  mode: 'development',
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
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
};

export default config;
