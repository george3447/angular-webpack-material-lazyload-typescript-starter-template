const webpack = require('webpack');
const chalk = require('chalk');
const moment = require('moment');
const path = require('path');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ENV = process.env.npm_lifecycle_event;
const config = module.exports = {

    entry: {
        vendor: [
            'angular',
            'angular-aria',
            'angular-animate',
            'angular-material',
            'angular-messages',
            'moment',
            'angular-ui-router',
            'rxjs',
            'oclazyload'
        ],
        app: './src/app/app.module.ts'
    },

    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: 'http://localhost:8080/',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js'
    },

    devtool: 'source-map',

    module: {
        rules: [{
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap!sass-loader' })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate'
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
            __ENV: JSON.stringify(ENV)
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) on ' + moment().format('MMMM Do YYYY, h:mm a') + ' ',
            clear: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({ filename: "assets/css/[name].css", allChunks: false }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'assets/js/[name].js' })
    ],
    devServer: {
        contentBase: './src',
        stats: 'minimal',
        historyApiFallback: true
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", '.ts', '.tsx', '.js', '.jsx', '.json']
    }
};