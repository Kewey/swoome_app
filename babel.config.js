module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
			[
				'module-resolver',
				{
					alias: {
						'@assets': './assets/',
						'@components': './core/components/',
						'@constants': './core/constants/',
						'@hooks': './core/hooks/',
						'@navigation': './core/navigation/',
						'@services': './core/services/',
						'@styles': './core/styles/',
						'@types': './core/types/',
						'@screens': './screens/',
					},
				},
			],
		],
	}
}
