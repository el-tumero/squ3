const path = require('path')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
  entry: { main:'./src/client/main.ts' },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/client'),
  },
};

const serverConfig = {
  entry: { index:'./src/server/index.ts'},
  mode: 'development',
  target: 'es2020',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/server')
  },
  experiments: {
    outputModule: true
  },
  externals: [
    nodeExternals()
  ]
}

module.exports = [clientConfig, serverConfig]