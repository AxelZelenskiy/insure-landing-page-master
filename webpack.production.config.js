const 	path 					= require('path'),
		webpack 				= require('webpack'),
		HtmlWebpackPlugin 		= require('html-webpack-plugin'),
		{ CleanWebpackPlugin }		= require('clean-webpack-plugin'),
		MiniCSSExtractPlugin	= require('mini-css-extract-plugin');

module.exports = {
	mode 		: 'production',
	devtool 	: 'nosources-source-map',
	context 	: path.resolve(__dirname,'src'),
	entry		: './scripts.js',
	output 		: {
		filename 	: 'assets/js/scripts.js',
		path		: path.resolve(__dirname,'design')
	},
	plugins 	: [
				new CleanWebpackPlugin(),
				new HtmlWebpackPlugin({
						hash : true,
						template : './index.html' }),
				new MiniCSSExtractPlugin({ filename : 'css/[name].[contentHash].css'}),
				new webpack.HotModuleReplacementPlugin(),
	],
	module 		: {
		rules		: [
						{
							test	: /\.html$/,
							use : {
								loader 	: 'html-loader',
								options : {
									minimize : false
								}
							}
						},
						{
							test	: /\.js$/,
							loader  : 'strip-loader',
							options	: {
									strip : ['console.*','alert*']
							} 
						},
						{
							test: /\.(svg|png|jpeg|jpg|gif|png)$/,
							use	: { 
								loader: 'file-loader',
								options:{
										name		: '[name].[ext]' ,
										outputPath	: 'assets/img'
										}
								}
						},
						{
							test 	: /\.scss$/,
							use		: [
										{ 
											loader: MiniCSSExtractPlugin.loader,
											options: {
              									publicPath: (resourcePath, context) => {
                									return path.relative(path.dirname(resourcePath), context) + '/';
              											},
              										}
										},
										'css-loader',
										'sass-loader'
							]
						}
		]
	}
};