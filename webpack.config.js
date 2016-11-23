const merge = require('webpack-merge');
const target = process.env.npm_lifecycle_event;

let commonConfig = require('./config/webpack.common.config.js');
let config;

switch (target) {
    case 'build':
        config = require('./config/webpack.dev.config.js');
        break;
    default:
        config = require('./config/webpack.prod.config.js');
        break;
}

module.exports = merge(commonConfig, config);