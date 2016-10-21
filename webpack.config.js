'use strict';

// Modules
var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const chalk = require('chalk');
const moment = require('moment');

var ENV = process.env.npm_lifecycle_event;

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = {
        app: './src/app/app.module.ts',
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
        ]
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    config.output = {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: 'http://localhost:8080/',

        // Filename for entry points
        // Only adds hash in release mode
        filename: 'assets/js/[name].js',

        // Filename for non-entry points
        // Only adds hash in release mode
        chunkFilename: 'assets/js/[name].js'
    };


    config.devtool = 'source-map';

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        rules: [{
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }, {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js

                test: /\.css$/,

                // Reference: https://github.com/webpack/style-loader
                // Use style-loader in development.
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?sourceMap' })
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css!sass?sourceMap' })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
            },
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/html-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'html?interpolate'
            }
        ],

    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    config.plugins.push(

        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules                                                                                                               
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                },
                sassLoader: {
                    //includePaths: ['./src/assets/css']
                },
                context: '',
                resolve: {

                }
            }
        }),

        new webpack.DefinePlugin({
            __ENV: JSON.stringify(ENV)
        }),

        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)' + ' on ' + moment().format('MMMM Do YYYY, h:mm a') +
                ' ',
            clear: false
        }),

        // Skip rendering index.html in test mode
        //if (!isTest) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({ filename: "assets/css/[name].css", allChunks: false }),

        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'assets/js/[name].js' })
    );


    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src',
        stats: 'minimal',
        historyApiFallback: true
    };

    config.resolve = {
        extensions: [".webpack.js", ".web.js", '.ts', '.tsx', '.js', '.jsx', '.json']
    };
    return config;
}();