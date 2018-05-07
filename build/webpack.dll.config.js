const webpack = require('webpack');
var path = require('path')
module.exports = {
    entry: {
        bundle: [
            'vue',
            'vuex',
            'vue-router',
            'vue-chartjs',
            'moment',
            'chart.js',
            'element-ui'
        ],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, './bundle.manifest.json'),
            name: '[name]_library',
        })
    ]
};