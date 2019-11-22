const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {main: './src/index.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},

	module: {
	    rules: [{ // тут описываются правила
	        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
	        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
	        exclude: /node_modules/ // исключает папку node_modules
	        },
	    	{
	    		test: /\.css$/,
	    		use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
	    	},
	    	{
		        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
		        use: [
		        	'file-loader?name=./fonts/[name].[ext]',
		        	{
		            loader: 'file-loader',
		            options: {
		              name: '[name].[ext]',
		              outputPath: 'fonts/'
		            	}
		            }]
			},
			{
				test: /\.(png|jpg|gif|ico|svg)$/,
				use: [
				    'file-loader?name=./images/[name].[ext]',
				    {
				      	loader: 'image-webpack-loader',
				      	options: {
					        mozjpeg: {
					          progressive: true,
					          quality: 65
					        },
					        // optipng.enabled: false will disable optipng
					        optipng: {
					          enabled: false,
					        },
					        pngquant: {
					          quality: [0.65, 0.90],
					          speed: 4
					        },
					        gifsicle: {
					          interlaced: false,
					        },
					        // the webp option will enable WEBP
					        webp: {
					          quality: 75
					        }
				    	}
		    		}]
		    	}
	    	]
	},

    plugins: [
    	new MiniCssExtractPlugin({
    		filename: 'style.[contenthash].css'
    	}),
    	new OptimizeCssAssetsPlugin({
		     assetNameRegExp: /\.css$/g,
		     cssProcessor: require('cssnano'),
		     cssProcessorPluginOptions: {
		             preset: ['default'],
		     },
		     canPrint: true
		}),
    	new HtmlWebpackPlugin({
		  // Означает, что:
		  inject: false, // стили НЕ нужно прописывать внутри тегов
		  template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
		  filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({
		    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
    ]
};