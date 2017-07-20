import * as webpack from 'webpack';
import * as path from 'path';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CompressionPlugin from 'compression-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
import * as OfflinePlugin from 'offline-plugin';

// import * as glob from 'glob-all';

// import * as PurifyCSSPlugin from 'purifycss-webpack';

const packageConfig: any = require("../package.json");



const fileName = "[name].[chunkhash]";
const hostEndPoint = {
    dist: "/",
    distLocal: "/",
    analyseBuild: "/"
};

let cwd = process.cwd();
console.log(process.env.NODE_ENV);
let ENV = process.env.npm_lifecycle_event;
let outputPath = path.join(cwd, '/', ENV);


const extractSASS = new ExtractTextPlugin({
    filename: `assets/css/${fileName}.css`
});

const extractCSS = new ExtractTextPlugin({
    filename: `assets/css/${fileName}.css`
});

const prodConfiguration: webpack.Configuration = {
    devtool: 'nosources-source-map',
    output: {
        path: outputPath,
        publicPath: hostEndPoint[ENV],
        filename: `assets/js/${fileName}.js`,
        chunkFilename: `assets/js/${fileName}.js`,
        devtoolModuleFilenameTemplate: '[resource-path]'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSASS.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            })
        }, {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } }
                ]
            })
        },

        {
            test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
            use: `file-loader?name=assets/images/[name].[hash].[ext]`
        },
        {
            test: /\.woff$|\.woff2$|\.eot$|\.woffs$|\.ttf$/,
            use: `file-loader?name=assets/fonts/[name].[hash].[ext]`
        }]
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
                context: '',
                resolve: {},
                ts: {
                    configFileName: './tsconfig.esnext.json'
                }
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSASS,
        extractCSS,
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync([
        //         path.join(__dirname, 'src/app/*.html'),
        //         path.join(__dirname, 'src/app/**/*.html'),
        //         path.join(__dirname, 'src/app/**/*.ts'),
        //         //path.join(__dirname, 'node_modules/angular-material/*.js')
        //     ]),
        //     purifyOptions: {
        //         info: true,
        //         whitelist: ['*md*', '*ng*', '*flex*', '*layout*', '*material*']
        //     }
        //     //whitelist: ['*md*', '*ng*']
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new WebpackPwaManifest({
            name: packageConfig.name,
            short_name: 'Angular PWA',
            description: packageConfig.description,
            background_color: '#ffffff',
            theme_color: '#607d8b',
            inject: true,
            icons: [{
                src: path.resolve('src/assets/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: 'assets/icons'
            },
            {
                src: path.resolve('src/assets/images/logo.png'),
                size: '1024x1024',
                destination: path.join('assets', 'icons')
            }
            ]
        }),
        new OfflinePlugin({
            excludes: ['manifest.*.json', '**/*.map'],
            AppCache: false,
            ServiceWorker: {
                events: true
            }
        })
    ]
};

export default prodConfiguration;