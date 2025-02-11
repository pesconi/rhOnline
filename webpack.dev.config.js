const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        try {
          decodeURIComponent(req.url);
          next();
        } catch (e) {
          console.error('Malformed URI:', req.url);
          res.status(400).send('Bad Request');
        }
      });
      return middlewares;
    },
  },
});