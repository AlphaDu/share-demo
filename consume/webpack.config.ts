import {container, sharing, Configuration, dependencies,} from 'webpack'
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import  * as SharedRequirePlugin from './src/SharedRequirePlugin'
const c = require('./package.json')
const { ContainerPlugin, ModuleFederationPlugin, ContainerReferencePlugin } = container
const { ConsumeSharedPlugin, SharePlugin } = sharing
console.log('consume')
const config: Configuration = {
    mode: "development",
    entry: './src/index.js',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: 'single',
    },
    output:{
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
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
            },
        }),
    ],
}
export default config