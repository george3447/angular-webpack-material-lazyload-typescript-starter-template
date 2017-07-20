import * as WebpackMerge from 'webpack-merge';
//const merge = require('webpack-merge');
const target = process.env.npm_lifecycle_event;

import commonConfig from './config/webpack.common.config';
import devConfig from './config/webpack.dev.config';
import prodConfig from './config/webpack.prod.config';

let config;

switch (target) {
    case 'build':
        config = devConfig;
        break;
    default:
        config = prodConfig;
        break;
}

const configuartion = WebpackMerge(commonConfig, config);

export default configuartion;