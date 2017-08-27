var webpack = require('webpack');

var config = {
    context: __dirname + '/js', // `__dirname` is root of project and `src` is source
    entry: {
        app: './entry.js'
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        publicPath: "/assets/",
        filename: 'bundle.js'
    }
};

module.exports = config;
