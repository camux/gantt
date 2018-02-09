var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'quick-gantt';

var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/src/Gantt.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		library: 'Gantt',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				// query: {
				// 	presets: ['es2015', 'react']
				// }
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
			}
		]
	},
	resolve: {
		extensions: ['.js'],
		symlinks: false
	},
	plugins: plugins
};

module.exports = config;
