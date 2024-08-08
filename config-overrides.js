const webpack = require('webpack');

module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		net: require.resolve('net-browserify'),
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		os: require.resolve('os-browserify'),
		url: require.resolve('url'),
		path: require.resolve('path-browserify'),
		querystring: require.resolve('querystring-es3'),
		zlib: require.resolve('browserify-zlib'),
		fs: false,
	});
	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	]);
	config.module.rules.unshift({
		test: /\.m?js$/,
		resolve: { fullySpecified: false },
	});
	return config;
};
