const express = require('express');
const path = require('path');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('config');

app.use(express.static(path.join(__dirname, 'build')));
app.use(
  '/cms/*',
  createProxyMiddleware({
    target: config.get('cms.url'),
    changeOrigin: true,
  })
);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000);