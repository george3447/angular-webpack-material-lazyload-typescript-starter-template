const webpack = require('webpack');
const chalk = require('chalk');
const moment = require('moment');

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const fileName = "[name].[chunkhash]";
let ENV = process.env.npm_lifecycle_event;
const hostEndPoint = {
    dist: "https://george3447.github.io/angular-webpack-material-lazyload-typescript-starter-template/",
    distLocal: "http://localhost:75/"
};

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
        path: (__dirname, '/', ENV),
        publicPath: hostEndPoint[ENV],
        filename: `assets/js/${fileName}.js`,
        chunkFilename: `assets/js/${fileName}.js`
    },

    module: {
        rules: [{
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader"
            }, {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: `file-loader?name=assets/images/[name].[hash].[ext]`
            },
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([ENV]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
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
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) on ' + moment().format('MMMM Do YYYY, h:mm a') +
                ' ',
            clear: false
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin(`assets/css/${fileName}.css`),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
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