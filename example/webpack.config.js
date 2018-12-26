const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const argv = require('yargs').argv

const webpackConfig = {
  mode: argv.mode || 'development',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, 'client/main.js')
  ],

  devtool: 'inline-cheap-module-source-map',

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': argv.mode === 'production' ? 'vue/dist/vue.js' : 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'client')
    }
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['./dist'], {
      root: __dirname,
      exclude: ['.gitkeep'],
      verbose: false,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'Vue Seed - Change me',
      template: path.join(__dirname, 'client/index.html')
    })
  ]
}

if (argv.mode !== 'production' && process.env.BABEL_ENV !== 'test') {
  webpackConfig['devtool'] = 'inline-source-map'
  webpackConfig['devServer'] = {
    contentBase: path.join(__dirname, 'wwwroot'),
    historyApiFallback: true,
    compress: true,
    port: 3001,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:5001',
        secure: false
      }
    }
  }
}

if (process.env.BABEL_ENV === 'test') {
  // exclude NPM deps from test bundle
  webpackConfig.externals = [require('webpack-node-externals')()]
  // use inline source map so that it works with mocha-webpack
  webpackConfig.devtool = 'inline-cheap-module-source-map'
}

module.exports = webpackConfig