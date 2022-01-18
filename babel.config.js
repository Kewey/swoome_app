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
						'@assets': './src/assets/',
						'@constants': './src/constants/',
						'@hooks': './src/hooks/',
						'@navigation': './src/navigation/',
						'@redux': './src/redux/',
						'@screens': './src/screens/',
						'@services': './src/services/',
						'@styles': './src/styles/',
						'@types': './src/types/',
						'@ui': './src/ui/',
					},
				},
			],
		],
	}
}
