const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');


const fileName = "[name].[chunkhash]";
const hostEndPoint = {
    dist: "https://george3447.github.io/angular-webpack-material-lazyload-typescript-starter-template/",
    distLocal: "/"
};

let cwd = process.cwd();
let ENV = process.env.npm_lifecycle_event;
let outputPath = path.join(cwd, '/', ENV);

module.exports = {
    output: {
        path: outputPath,
        publicPath: hostEndPoint[ENV],
        filename: `assets/js/${fileName}.js`,
        chunkFilename: `assets/js/${fileName}.js`
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                use: `file-loader?name=assets/images/[name].[hash].[ext]`
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin([ENV], { root: cwd }),
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
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin(`assets/css/${fileName}.css`),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({
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
        new OfflinePlugin({
            AppCache: false,
            ServiceWorker: {
                events: true
            }
        })
    ]
};