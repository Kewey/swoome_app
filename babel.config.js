module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
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
