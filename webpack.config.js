const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        roots: [path.resolve(__dirname), './src'],
    },
    mode: 'development',
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: isProductionMode
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        options: {
                            esModule: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    }
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            title: 'Basic Web App Template',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            template: path.resolve(__dirname, './public/index.html'),
            hash: true,
            scriptLoading: 'defer',
            inject: 'head', // head better for extension
            excludeChunks: ['manifest', 'background'],
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/manifest.json'),
                    to: path.resolve(__dirname, './dist/manifest.json'),
                },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        host: '0.0.0.0',
        port: 2016,
        proxy: {
            '/api': {
                target: {
                    host: '0.0.0.0',
                    protocol: 'http:',
                    port: 5000,
                },
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    devtool: 'source-map',
};
