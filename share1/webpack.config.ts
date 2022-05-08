import {container, sharing, Configuration, dependencies,} from 'webpack'
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as SharedRequirePlugin from './src/SharedRequirePlugin'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const c = require('./package.json')
const { ContainerPlugin, ContainerReferencePlugin} = container
const { ProvideSharedPlugin, SharePlugin} = sharing
console.log('webpack1')
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

            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
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
                './index':"./src/mod.js",
            }
        }),
        new BundleAnalyzerPlugin(),
        new SharedRequirePlugin({
            provides: {
                "antd":  {
                    shareKey: 'antd',
                    eager: true
                },
                "react-dom":  {
                    shareKey: 'react-dom',
                    eager: false
                },
                "react": {
                    shareKey: 'react',
                    eager: false
                },
            }
        }),
    ],
}
export default config