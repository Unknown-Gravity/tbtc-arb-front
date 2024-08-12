const webpack = require('webpack');
const {
	override,
	addBabelPlugin,
	addWebpackModuleRule,
} = require('customize-cra');

module.exports = override(
	addBabelPlugin([
		'@babel/plugin-proposal-class-properties',
		{ loose: true },
	]),
	addBabelPlugin(['@babel/plugin-proposal-private-methods', { loose: true }]),
	addBabelPlugin([
		'@babel/plugin-proposal-private-property-in-object',
		{ loose: true },
	]),
	addWebpackModuleRule({
		test: /\.js$/,
		include: /node_modules\/bufio/,

		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	}),
	config => {
		config.resolve.extensions = [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
			'.mjs',
			'.json',
		];
		// Ensure 'fullySpecified' is set correctly
		config.resolve.fullySpecified = false;
		config.resolve.fallback = {
			vm: require.resolve('vm-browserify'),
			tls: false,
			zlib: require.resolve('browserify-zlib'),
			querystring: require.resolve('querystring-es3'),
			path: require.resolve('path-browserify'),
			fs: false,
			http: require.resolve('stream-http'),
			net: false,
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			url: require.resolve('url/'),
			// Ensure process is fully specified
			process: require.resolve('process/browser.js'), // Note the explicit .js extension
			'process/browser': require.resolve('process/browser.js'), // Explicit .js extension
		};
		config.plugins.push(
			new webpack.ProvidePlugin({
				process: 'process/browser.js', // Ensure the .js extension is specified
				Buffer: ['buffer', 'Buffer'],
			}),
		);
		return config;
	},
);
