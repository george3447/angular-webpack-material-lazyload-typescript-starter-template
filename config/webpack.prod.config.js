const webpack = require('webpack');
const webpackConfig = require('webpack-config').default;
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fileName = "[name].[chunkhash]";
const hostEndPoint = {
    dist: "https://george3447.github.io/angular-webpack-material-lazyload-typescript-starter-template/",
    distLocal: "http://localhost:75/"
};

let cwd = process.cwd();
let ENV = process.env.npm_lifecycle_event;

module.exports = new webpackConfig()
    .extend('./config/webpack.common.config.js')
    .merge({
        output: {
            path: path.join(cwd, '/', ENV),
            publicPath: hostEndPoint[ENV],
            filename: `assets/js/${fileName}.js`,
            chunkFilename: `assets/js/${fileName}.js`
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' })
                },
                {
                    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                    loader: `file-loader?name=assets/images/[name].[hash].[ext]`
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
            })
        ]
    });