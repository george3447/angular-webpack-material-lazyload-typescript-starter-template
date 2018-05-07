import * as webpack from "webpack";
import * as path from "path";

import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CompressionPlugin from "compression-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as WebpackPwaManifest from "webpack-pwa-manifest";
import * as OfflinePlugin from "offline-plugin";

const packageConfig: any = require("../package.json");

const fileName = "[name].[chunkhash]";
const hostEndPoint = {
	dist: "/angular-webpack-material-lazyload-typescript-starter-template",
	distLocal: "",
	analyseBuild: ""
};

let cwd = process.cwd();
let ENV = process.env.npm_lifecycle_event;
let outputPath = path.join(cwd, "/", ENV);

const prodConfiguration: webpack.Configuration = {
	mode: "production",
	devtool: "nosources-source-map",
	output: {
		path: outputPath,
		publicPath: hostEndPoint[ENV],
		filename: `assets/js/${fileName}.js`,
		chunkFilename: `assets/js/${fileName}.js`,
		devtoolModuleFilenameTemplate: "[resource-path]"
	},
	module: {
		rules: [
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
				use: {
					loader: "file-loader",
					options: { name: "assets/images/[name].[hash].[ext]" }
				}
			},
			{
				test: /\.woff$|\.woff2$|\.eot$|\.woffs$|\.ttf$/,
				use: {
					loader: "file-loader",
					options: {
						name: "assets/fonts/[name].[hash].[ext]",
						publicPath: "../../"
					}
				}
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		},
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						warnings: false
					}
				},
				sourceMap: false
			}),
		]
	},
	plugins: [
		new CleanWebpackPlugin([ENV], { root: cwd, exclude: ["web.config"] }),
		new webpack.NoEmitOnErrorsPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `assets/css/${fileName}.css`
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),

		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new WebpackPwaManifest({
			name: packageConfig.name,
			short_name: "Angular PWA",
			description: packageConfig.description,
			background_color: "#ffffff",
			theme_color: "#607d8b",
			inject: true,
			icons: [
				{
					src: path.resolve("src/assets/images/logo-small.png"),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: "assets/icons"
				},
				{
					src: path.resolve("src/assets/images/logo-small.png"),
					size: "1024x1024",
					destination: path.join("assets", "icons")
				}
			]
		}),
		new OfflinePlugin({
			excludes: ["manifest.*.json", "**/*.map"],
			AppCache: false,
			ServiceWorker: {
				events: true,
				navigateFallbackURL: "/"
			}
		})
	]
};

export default prodConfiguration;
