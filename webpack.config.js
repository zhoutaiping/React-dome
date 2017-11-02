var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 

var publicPath = '/dist/';
var path = __dirname+'/dist';

var plugins=[]
var config = {
    entry: {
        app:'./src/root',
        vendor:[
            'react',
            'react-redux',
            'redux',
            'react-router',
            'react-thunk'
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    output: {
        publicPath,
        path,
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
                
            query: {
                presets: ['es2015', 'react']
            }
        },{
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
        },{
            test: /\.less$/,
            loader: "style!css!less"
        },{
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=20000&name=[name].[ext]'
        }
]
    },
    resolve: {
      //modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: ['', '.web.js', '.js', '.json'],
    },
    plugins,
};

module.exports = config;