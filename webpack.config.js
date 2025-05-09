const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
	entry: './src/script.ts',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.js'],
	},

	output: {
		filename: 'script.js',
		path: path.resolve(__dirname, 'dest'),
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({ template: 'src/index.html' }),
		new CopyPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	],
});
