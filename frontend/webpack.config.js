const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
	entry: {
		index: './src/tsx/app.tsx',
	},
	resolve: {
		mainFields: ['browser', 'main', 'module'],
		// 不加這行的話，webpack 會在建置時讀到 graphql 的 index.mjs 而報錯
		extensions: ['.ts', '.tsx', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: 'bundle.js',
		publicPath: '/dist/',
		chunkFilename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					'cache-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/typescript',
							],
						}
					},
				]
			},
			{
				test: /\.tsx$/,
				use: [
					'cache-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/typescript',
								'@babel/preset-react'
							],
							plugins: [
								[
									'react-css-modules',
									{
										generateScopedName: '[local]-[hash:base64:10]',
										autoResolveMultipleImports: true
									}
								]
							]
						}
					},
				]
			},
			{
				test: /\.css$/,
				oneOf: [
					{
						// import 時，後綴 ?global 代表 css 作用到全域
						resourceQuery: /^\?global$/,
						use: ['style-loader', 'cache-loader', 'css-loader', 'postcss-loader']
					},
					{
						use: ['style-loader', 'cache-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:10]', 'postcss-loader']
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
				  	}
				]
			  }
		]
	},
	mode: 'development'
});
