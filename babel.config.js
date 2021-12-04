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
						'@hooks': './core/hooks/',
						'@constants': './core/constants/',
						'@services': './core/services/',
						'@navigation': './core/navigation/',
						'@types': './core/types/',
						'@screens': './screens/',
					},
				},
			],
		],
	}
}
