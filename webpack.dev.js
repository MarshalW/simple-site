const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    devtool: "eval-cheap-module-source-map",

    entry: {
        index: "./src/page-index/main.js"
    },

    devServer: {
        port: 8080
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/page-index/tmpl.html",
            inject: true,
            chunks: ["index"],
            filename: "index.html"
        })
    ]
};