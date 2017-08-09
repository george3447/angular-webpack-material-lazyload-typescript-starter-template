import * as webpack from "webpack";
import * as path from "path";

import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CompressionPlugin from "compression-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as WebpackPwaManifest from "webpack-pwa-manifest";
import * as OfflinePlugin from "offline-plugin";

const packageConfig: any = require("../package.json");

const fileName = "[name].[chunkhash]";
const hostEndPoint = {
	dist: "",
	distLocal: "",
	analyseBuild: ""
};

let cwd = process.cwd();
let ENV = process.env.npm_lifecycle_event;
let outputPath = path.join(cwd, "/", ENV);

const extractSASS = new ExtractTextPlugin({
	filename: `assets/css/${fileName}.css`
});

const extractCSS = new ExtractTextPlugin({
	filename: `assets/css/${fileName}.css`
});

const prodConfiguration: webpack.Configuration = {
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
				test: /\.scss$/,
				use: extractSASS.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: { sourceMap: true } },
						{
							loader: "postcss-loader",
							options: { sourceMap: true }
						},
						{ loader: "sass-loader", options: { sourceMap: true } }
					]
				})
			},
			{
				test: /\.css$/,
				use: extractCSS.extract({
					fallback: "style-loader",
					use: { loader: "css-loader", options: { sourceMap: true } }
				})
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
						outputPath: "assets/fonts/",
						publicPath: "../../"
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([ENV], { root: cwd, exclude: ["web.config"] }),
		new webpack.NoEmitOnErrorsPlugin(),
		extractSASS,
		extractCSS,
		new webpack.optimize.AggressiveMergingPlugin(),
		// new webpack.optimize.AggressiveSplittingPlugin({
		//   minSize: 300000,
		//   maxSize: 500000
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
