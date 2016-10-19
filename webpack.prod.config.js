'use strict';

// Modules
var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

const chalk = require('chalk');
const moment = require('moment');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
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
        publicPath: '/angular-webpack-material-lazyload-typescript-starter-template/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: 'assets/js/[name].[hash].js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: 'assets/js/[name].[hash].js'

    };

    //config.devtool = 'eval';

    // Initialize module
    config.module = {
        preLoaders: [],
        loaders: [{
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }, {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                // Extract css files in production builds
                //
                // Reference: https://github.com/webpack/style-loader
                // Use style-loader in development.
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', // The backup style loader
                    'css!sass'
                )
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
            },
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'html?interpolate'
            }
        ]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    // Skip rendering index.html in test mode
    //if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(

        new webpack.DefinePlugin({
            __ENV: JSON.stringify(ENV)
        }),

        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)' + ' on ' + moment().format('MMMM Do YYYY, h:mm a') +
                ' ',
            clear: false
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin("assets/css/[name].[hash].css"),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",

            filename: "assets/js/[name].[hash].js",

            // (Give the chunk a different name)

            minChunks: Infinity
                // (with more entries, this ensures that no other module
                //  goes into the vendor chunk)
        }),


        // Add build specific plugins
        // if (isProd) {
        // config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
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
        })
    );

    config.resolve = {
        extensions: [".webpack.js", ".web.js", '', '.ts', '.tsx', '.js', '.jsx', '.json']
    };

    return config;
}();