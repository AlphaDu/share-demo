"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var SharedRequirePlugin = require("./src/SharedRequirePlugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var c = require('./package.json');
var ContainerPlugin = webpack_1.container.ContainerPlugin, ContainerReferencePlugin = webpack_1.container.ContainerReferencePlugin;
var ProvideSharedPlugin = webpack_1.sharing.ProvideSharedPlugin, SharePlugin = webpack_1.sharing.SharePlugin;
console.log('webpack1');
var config = {
    mode: "development",
    entry: './src/index.js',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: 'single'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build',
        chunkFilename: '[id].[chunkhash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ContainerPlugin({
            filename: "remoteEntry.js",
            name: "sharemain",
            shareScope: 'sharemain',
            library: {
                name: 'sharemain',
                type: 'var'
            },
            exposes: {
                './index': "./src/mod.js"
            }
        }),
        new BundleAnalyzerPlugin(),
        new SharedRequirePlugin({
            provides: {
                "antd": {
                    shareKey: 'antd',
                    eager: true
                },
                "react-dom": {
                    shareKey: 'react-dom',
                    eager: false
                },
                "react": {
                    shareKey: 'react',
                    eager: false
                }
            }
        }),
    ]
};
exports["default"] = config;
