const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dde5-2001-44c8-440d-9067-64-22dd-7813-5c80.ngrok.io',
      changeOrigin: true,
    })
  );
};