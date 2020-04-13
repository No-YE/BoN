const withImages = require('next-images');
const withCss = require('@zeit/next-css');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = withImages(withCss({
  distDir: '../../dist/webview/.next',
  webpack(config) {
    if (!config.resolve) config.resolve = {}
    if (!config.resolveLoader) config.resolveLoader = {}
    if (!config.resolve.plugins) config.resolve.plugins = []
    if (!config.resolveLoader.plugins) config.resolveLoader.plugins = []

    config.resolve.plugins.push(PnpWebpackPlugin);
    config.resolveLoader.plugins.push(PnpWebpackPlugin.moduleLoader(module));

    return config;
  }
}));
