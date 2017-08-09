import * as webpack from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

const devConfiguration: webpack.Configuration = {
	output: {
		publicPath: "",
		filename: "assets/js/[name].js",
		chunkFilename: "assets/js/[name].js",
		devtoolModuleFilenameTemplate: "[resource-path]"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: { sourceMap: true } },
						// { loader: 'postcss-loader', options: { sourceMap: true } },
						{ loader: "sass-loader", options: { sourceMap: true } }
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: { loader: "css-loader", options: { sourceMap: true } }
				})
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
				use: {
					loader: "file-loader",
					options: { name: "assets/images/[name].[ext]" }
				}
			},
			{
				test: /\.woff$|\.woff2$|\.eot$|\.woffs$|\.ttf$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "assets/fonts/",
						publicPath: "../../"
					}
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "assets/css/[name].css",
			allChunks: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "assets/js/[name].js"
		})
	],
	devServer: {
		contentBase: "./src",
		stats: "minimal",
		historyApiFallback: true
	}
};

export default devConfiguration;
