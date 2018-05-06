import * as webpack from "webpack";
import Chalk from "chalk";
import { format } from "date-fns";

import * as ProgressBarPlugin from "progress-bar-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

import * as path from 'path';

const packageConfig: { version: string } = require("../package.json");

let ENV = process.env.npm_lifecycle_event;
let nodeENV = process.env.NODE_ENV ? process.env.NODE_ENV : "-";
let srcPath = path.resolve(__dirname, "../src");
console.log(srcPath);

console.log(Chalk`{blue BUILD ENVIRONMENT}: {green ${nodeENV.toUpperCase()}}
 `);

const commonConfiguration: webpack.Configuration = {
	entry: {
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
				},
				include: srcPath,
				exclude: /node_modules/
			},
			{
				test: /\.ts$/,
				use: [
					{ loader: "babel-loader" },
					{
						loader: "ts-loader",
						options: { configFile: "tsconfig.esnext.json" }
					}
				],
				include: srcPath,
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: { interpolate: true, removeAttributeQuotes: false }
				},
				include: srcPath,
				exclude: /node_modules/
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
				Chalk.green.bold(":percent") +
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
