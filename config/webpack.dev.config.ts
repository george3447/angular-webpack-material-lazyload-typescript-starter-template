import * as webpack from "webpack";
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
						name: "assets/fonts/[name].[ext]"
					}
				}
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		
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
