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
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!sass-loader' })
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                use: 'file-loader?name=assets/images/[name].[ext]'
            },
            {
                test: /\.woff$|\.woff2$|\.eot$|\.woffs$|\.ttf$/,
                use: `file-loader?name=assets/fonts/[name].[ext]`
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