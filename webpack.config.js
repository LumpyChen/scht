/**
 * Created by Lumpychen on 16/1/9.
 */

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
            { test: /\.(css)$/, loader: 'style-loader!css-loader' },
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }



};