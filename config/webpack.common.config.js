const webpack = require('webpack');
const chalk = require('chalk');
const moment = require('moment');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let ENV = process.env.npm_lifecycle_event;

module.exports = {

    entry: {
        vendor: [
            'angular',
            'angular-aria',
            'angular-animate',
            'angular-messages',
            'angular-material',
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
                resolve: {}
            }
        }),
        new webpack.DefinePlugin({
            __ENV: JSON.stringify(ENV),
            __VERSION: JSON.stringify(require("../package.json").version)
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) on ' + moment().format('MMMM Do YYYY, h:mm a') +
                ' ',
            clear: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", '.ts', '.tsx', '.js', '.jsx', '.json']
    }
};