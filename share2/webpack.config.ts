import {Configuration, sharing} from 'webpack'

const { ConsumeSharedPlugin } = sharing
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
        new ProvideSharedPlugin({
            shareScope: 'shareone',
            provides: {
                "react": {
                    shareKey: 'react',
                },
                "./src/mod.js": {
                    shareKey: 'mod1',
                    version: '0.0.1'
                },
            }
        }),
        new ConsumeSharedPlugin({
            consumes: {

            },
            shareScope: ""
        }),
    ]
}
export default config