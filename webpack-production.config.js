var devConfig = require('./webpack.config.js');
var webpack = require("webpack");
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var uglifyJs = new webpack.optimize.UglifyJsPlugin({
    compress: {
     warnings: false
    }
});
devConfig.plugins.push(uglifyJs);
// 为react指示编译生产环境代码
var definePlugin = new webpack.DefinePlugin({
    'process.env':{
        'NODE_ENV': JSON.stringify('production')
    }
});
devConfig.plugins.push(definePlugin);
devConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name:['vendor'],
    minChunks: Infinity
}))

function MyPlugin(options){
    this.options = options;
}
MyPlugin.prototype.apply = function(compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            for (var i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
    });
};


devConfig.plugins.push(new MyPlugin({
    paths:[]
}));
devConfig.plugins.push(new WebpackMd5Hash())
devConfig.plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包
devConfig.plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: '../index.html', //生成的html存放路径，相对于 path
    template: './build/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));
module.exports = devConfig;