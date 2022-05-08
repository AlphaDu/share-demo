"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var SharedRequirePlugin = require("./src/SharedRequirePlugin");
var c = require('./package.json');
var ContainerPlugin = webpack_1.container.ContainerPlugin, ModuleFederationPlugin = webpack_1.container.ModuleFederationPlugin, ContainerReferencePlugin = webpack_1.container.ContainerReferencePlugin;
var ConsumeSharedPlugin = webpack_1.sharing.ConsumeSharedPlugin, SharePlugin = webpack_1.sharing.SharePlugin;
console.log('consume');
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
                exclude: /node_modules/,
                options: {
                    plugins: ['@babel/plugin-syntax-jsx']
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new SharedRequirePlugin({
            externalModules: [
                "react",
                "jquery",
                "react-dom",
                "antd"
            ]
        }),
        new ContainerReferencePlugin({
            remoteType: 'import',
            remotes: {
                sharemain: 'sm@https://localhost:3000/remoteEntry.js'
            }
        }),
        new ConsumeSharedPlugin({
            consumes: {
                packageName: 'react',
                shareScope: 'shareone'
            }
        }),
    ]
};
exports["default"] = config;
