const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ChunkController = require("./utils");

const generateMultiPages = () => {
	const multiPages = [];
	const templateHtml = ChunkController.getTemplateHtml();
	for (const filename in templateHtml) {
		if (Object.hasOwnProperty.call(templateHtml, filename)) {
			const template = templateHtml[filename];
			multiPages.push({
				filename,
				template,
			});
		}
	}
	return multiPages;
};

/**@type { import('webpack').Configuration } */
const config = {
	entry: {
		...ChunkController.getEntrys(),
	},
	output: {
		path: path.join(process.cwd(), "docs"),
		filename: "[name].bundle.js",
	},
	plugins: [
		...generateMultiPages().map((page) => {
			return new HtmlWebpackPlugin({
				filename: page.filename + ".html",
				template: page.template,
				chunks: [page.filename],
			});
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts/,
				loader: "esbuild-loader",
				options: {
					loader: "ts",
					target: "es2015",
					// tsconfigRaw: require('./tsconfig.json')
				},
			},
		],
	},
};

module.exports = config;
