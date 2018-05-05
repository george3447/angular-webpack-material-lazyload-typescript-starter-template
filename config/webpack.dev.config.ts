import * as webpack from "webpack";
//import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

const devConfiguration: webpack.Configuration = {
	mode: "development",
	output: {
		publicPath: "",
		filename: "assets/js/[name].js",
		chunkFilename: "assets/js/[name].js",
		devtoolModuleFilenameTemplate: "[resource-path]"
	},
	devtool: "source-map",
	module: {
		rules: [
			// {
			// 	test: /\.scss$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: [
			// 			{ loader: "css-loader", options: { sourceMap: true } },
			// 			// { loader: 'postcss-loader', options: { sourceMap: true } },
			// 			{ loader: "sass-loader", options: { sourceMap: true } }
			// 		]
			// 	})
			// },
			// {
			// 	test: /\.css$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: { loader: "css-loader", options: { sourceMap: true } }
			// 	})
			// },
			{
				test: /\.s?[ac]ss$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
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
						name: "assets/fonts/[name].[ext]"//,
						//outputPath: "assets/fonts/"//,
						//publicPath: "../../"
					}
				}
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		// new ExtractTextPlugin({
		// 	filename: "assets/css/[name].css",
		// 	allChunks: false
		// }),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'assets/css/[name].css'
		})
	],
	optimization: {
		splitChunks: {
			name: "vendor"
		}
	},
	devServer: {
		contentBase: "./src",
		stats: "minimal",
		historyApiFallback: true
	}
};

export default devConfiguration;
