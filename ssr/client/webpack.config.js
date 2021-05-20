const path = require('path');
const PUB = path.resolve(process.env.PWD, 'dist');
const reviewsSrc = path.resolve(process.env.PWD, 'reviews', 'src');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        reviews: path.resolve(__dirname, 'reviews', 'src', 'index.jsx'),
    },
    mode: 'production',
    output: {
        path: PUB,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new CompressionPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: 'babel-loader',
                include: [reviewsSrc],
            },
            {
                test: /\.(scss|css)$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
