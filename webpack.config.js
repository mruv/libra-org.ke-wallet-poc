var path = require('path');

const webpack = require('webpack');

module.exports = {
    entry: './ui/ui.js',
    devtool: 'sourcemaps',
    cache: false,
    mode: 'production',
    // mode: 'development',
    output: {
        path: __dirname,
        filename: './public/javascripts/built/bundle.js'
    }, module: {
        rules: [{
            test: path.join(__dirname, '.'),
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }]
        }]
    }, plugins: [new webpack.ProvidePlugin({ "React": "react" })]
};