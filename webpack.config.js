const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')

const clientConfig = {
  entry: { main:'./src/client/main.ts', auth:'./src/client/auth/auth.ts' },
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
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new Dotenv({
      path: './client.config.env'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/client/scripts'),
  }
};

const serverConfig = {
  entry: { index:'./src/server/index.ts'},
  mode: 'development',
  target: 'node',
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
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/server')
  },
  externals: [
    nodeExternals()
  ]
}

module.exports = [clientConfig, serverConfig]