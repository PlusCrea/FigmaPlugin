const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',
    node: {
        fs: 'empty',
    },
    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/app/index.tsx', // The entry point for your UI code
        code: './src/plugin/controller.ts', // The entry point for your plugin code
    },

    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            {test: /\.css$/, use: ['style-loader', {loader: 'css-loader'}]},
            {test: /\.jsx$/, exclude: /node_modules/, use: ['babel-loader']},
            // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
            {test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader'},
        ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js']},

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },
    /*
    optimization: {
        splitChunks: {chunks: 'all'},
    },
    */
    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CleanWebpackPlugin(),
    ],
});
