const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ENV = process.env.npm_lifecycle_event;

module.exports = {
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap!sass-loader' })
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: "assets/css/[name].css", allChunks: false }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'assets/js/[name].js' })
    ],
    devServer: {
        contentBase: './src',
        stats: 'minimal',
        historyApiFallback: true
    }
};