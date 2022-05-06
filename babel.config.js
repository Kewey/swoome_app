module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module:react-native-dotenv',
				{
					envName: 'APP_ENV',
					moduleName: '@env',
					path: '.env',
					blocklist: null,
					allowlist: null,
					safe: false,
					allowUndefined: false,
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
