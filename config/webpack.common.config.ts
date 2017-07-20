import * as webpack from 'webpack';
import * as chalk from 'chalk';
import { format } from 'date-fns';

import * as ProgressBarPlugin from 'progress-bar-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const packageConfig: { version: string } = require("../package.json");

let ENV = process.env.npm_lifecycle_event;


const commonConfiguration: webpack.Configuration = {

    entry: {
        vendor: [
            'angular',
            'angular-aria',
            'angular-animate',
            'angular-messages',
            'angular-material',
            '@uirouter/angularjs',
            'oclazyload'
        ],
        app: './src/app/app.module.ts'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: "pre",
            use: "tslint-loader"
        },
        {
            test: /\.ts$/,
            use: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.html$/,
            use: 'html-loader?interpolate'
        }
        ]
    },

    plugins: [

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                },
                sassLoader: {},
                context: '',
                resolve: {},
                ts: {
                    configFileName: './tsconfig.esnext.json'
                }
            }
        }),
        new webpack.DefinePlugin({
            __ENV: JSON.stringify(ENV),
            __VERSION: JSON.stringify(packageConfig.version)
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) on ' + format(new Date(), 'MMMM Do YYYY, h:mm a') +
            ' ',
            clear: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
};

export default commonConfiguration;