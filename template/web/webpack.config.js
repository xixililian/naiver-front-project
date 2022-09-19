const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';
// const inject = devMode ? "head" : "body";

const pages = [
    "index", // 首页
], entry = {};
pages.forEach(pagename => {
    entry[pagename] = "/src/pages/" + pagename + "/script.js"
});

module.exports = {
	entry,
    output: {
		path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: devMode ? '/' : '/static/index/'
    },

	mode: devMode ? 'development' : 'production',
	devtool: devMode ? 'inline-source-map' : '',
	devServer: {
		contentBase: './dist',
		disableHostCheck: true,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin({ // 生成前，清除原有文件
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico', '!layui', '!layui/**/*', '!outer', '!outer/**/*', '!video']
		}),
		new webpack.HashedModuleIdsPlugin(), // 保证没有修改过的模块打包后 hash 不变
		new MiniCssExtractPlugin({ // 提取css
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/[name].css',
			// chunkFilename: '[id].css',
		}),
		...pages.map(pagename => new HtmlWebpackPlugin({
			filename: pagename + '.html',
			title: pagename,
			template: 'src/pages/' + pagename + '/' + pagename + '.htm',
			chunks: [pagename],
			minify: false,
			// inject,
		}))
	],
	module: {
		rules: [

			{ // css 文件处理
				test: /\.(sa|(s?c))ss$/,
				exclude: /node_modules\/(?!(dom7|ssr-window|swiper|ss-usual)\/).*/,
				use: [
					MiniCssExtractPlugin.loader,
					// devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					'sass-loader',
				]
			},

			{ // 图片处理，函数的作用是设置输出目录。
				test: /\.(png|svg|jpg|gif|mp4)$/,
				exclude: /node_modules\/(?!(dom7|ssr-window|swiper|ss-usual)\/).*/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							esModule: false
						}
					}
				]
			},

			{ // 字体文件处理
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				exclude: /node_modules\/(?!(dom7|ssr-window|swiper|ss-usual)\/).*/,
				use: [
					{ loader: 'file-loader' }
				],
			},

			{ // es6、7、8 处理
				test: /\.m?js$/,
				exclude: /node_modules\/(?!(dom7|ssr-window|swiper|ss-usual)\/).*/,
				// include: /([\\/]node_modules[\\/](dom7|ssr-window|swiper|ss-usual)[\\/])|([\\/]src[\\/])/,
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['@babel/preset-env'] }
					}
				]
			},
		]
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					ecma: 5, //Setting this to "ecma: 5" solved problem.
					mangle: {
						eval: true,
					},
				}
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
		// runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: { // 将外部库统一放到 vendor 里面
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			},
		}
	}
};