const webpackConfig = require('webpack-config').default;
const target = process.env.npm_lifecycle_event;

let configPath;

switch (target) {
    case 'build':
        configPath = './config/webpack.dev.config.js';
        break;
    default:
        configPath = './config/webpack.prod.config.js';
        break;
}
module.exports = new webpackConfig().extend(configPath);