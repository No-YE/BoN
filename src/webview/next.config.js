const withImages = require('next-images');
const withCss = require('@zeit/next-css');

module.exports = withImages(withCss({
  distDir: '../../dist/webview/.next',
  webpack: config => config,
}));
