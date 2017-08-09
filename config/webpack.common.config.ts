import * as webpack from "webpack";
import * as chalk from "chalk";
import { format } from "date-fns";

import * as ProgressBarPlugin from "progress-bar-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const packageConfig: { version: string } = require("../package.json");

let ENV = process.env.npm_lifecycle_event;
let nodeENV = process.env.NODE_ENV ? process.env.NODE_ENV : "-";

console.log(chalk`{blue BUILD ENVIRONMENT}: {green ${nodeENV.toUpperCase()}}
 `);

const commonConfiguration: webpack.Configuration = {
	entry: {
		vendor: [
			"angular",
			"angular-aria",
			"angular-animate",
			"angular-cookies",
			"angular-messages",
			"angular-material",
			"@uirouter/angularjs",
			"oclazyload"
		],
		app: "./src/app/app.module.ts"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: "pre",
				use: {
					loader: "tslint-loader",
					options: { emitErrors: true, failOnHint: true }
				}
			},
			{
				test: /\.ts$/,
				use: [
					{ loader: "babel-loader" },
					{
						loader: "ts-loader",
						options: { configFileName: "./tsconfig.esnext.json" }
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: { interpolate: true, removeAttributeQuotes: false }
				}
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			__ENV: JSON.stringify(ENV),
			__VERSION: JSON.stringify(packageConfig.version)
		}),
		new ProgressBarPlugin({
			format:
				"  build [:bar] " +
				chalk.green.bold(":percent") +
				" (:elapsed seconds) on " +
				format(new Date(), "MMMM Do YYYY, h:mm a") +
				" ",
			clear: false
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: "body",
			title: "new title"
		})
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	}
};

export default commonConfiguration;
