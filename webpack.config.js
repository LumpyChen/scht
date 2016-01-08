/**
 * Created by Lumpychen on 16/1/9.
 */
    var path = require('path');

module.exports = {

    entry: {
        "entry":"./entry.js"
    },

    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    externals: {
        "jquery" : "jQuery",
    }



};