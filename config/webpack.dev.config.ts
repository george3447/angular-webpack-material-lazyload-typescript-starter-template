import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const devConfiguration: webpack.Configuration = {
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js',
        devtoolModuleFilenameTemplate: '[resource-path]'
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

export default devConfiguration;