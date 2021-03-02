
const path = require('path');
const devServer = require('webpack-dev-server');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, "./src"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,"./public/index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    },
    devServer: {
        port: 3000
    }
}