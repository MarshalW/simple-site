const path = require("path");

// CleanWebpackPlugin 可能的错误
// https://stackoverflow.com/questions/56567930/typeerror-cleanwebpackplugin-is-not-a-constructor
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
    devtool: "source-map",
    entry: {
        index: "./src/page-index/main.js"
    },

    output: {
        filename: '[name].[hash:20].js',
        path: buildPath
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            { // 增加这个规则配置，babel将es6语法做处理，否则最小化的时候会不识别而报错
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:20].[ext]',
                            limit: 4096
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/page-index/tmpl.html",
            inject: "body",
            chunks: ["index"],
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({ //优化部分加上这个插件，是做最小化js文件的
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})]
    }
};