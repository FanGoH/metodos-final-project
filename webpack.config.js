const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
	mode: "development",
	entry: { index: "./src/index.js" },
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "docs"),
	},
	devServer: {
		contentBase: "./docs",
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Development",
			template: "src/index.html",
		}),
		new SourceMapDevToolPlugin(),
	],
	devtool: "eval-source-map",
	module: {
		rules: [
			{
				test: /\.css$/i,

				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
};
