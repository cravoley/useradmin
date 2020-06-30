const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('config');

module.exports = function(app) {
  app.use(
    '/cms/*',
    createProxyMiddleware({
      target: config.get('cms.url'),
      changeOrigin: true,
    })
  );
};