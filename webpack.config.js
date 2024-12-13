const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js',
        publicPath: '/', // Ensure public paths are served from root
    },
    target: 'web',
    devtool: 'source-map',
    stats: {
        warnings: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]', // Preserve folder structure and original names
                        context: path.resolve(__dirname, 'src'), // Make paths relative to 'src'
                    },
                },
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
        ],
    },
    resolve: {
        alias: {
            lights$: path.resolve(__dirname, 'src/components/lights'),
            objects$: path.resolve(__dirname, 'src/components/objects'),
            scenes$: path.resolve(__dirname, 'src/components/scenes'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ title: pkg.title, favicon: 'src/favicon.ico' }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Serve the `assets` folder
        },
        compress: true, // Enable gzip compression
        port: 8080, // Specify port
        open: true, // Automatically open the browser
    },
};
