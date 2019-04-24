require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    webpack: (config, options) => {
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['api'] = path.join(__dirname, 'api')
        config.resolve.alias['css'] = path.join(__dirname, 'css')

        config.plugins = [
            ...(config.plugins || []),
            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ]

        const oldEntry = config.entry
        config.entry = () => oldEntry().then(entry => {
            if(entry['main.js']) entry['main.js'].push(path.resolve('./lib/offline'))
            return entry
        })
        if(!options.dev) {
            config.plugins = [
                ...(config.plugins || []),
                new SWPrecacheWebpackPlugin({
                    cacheId: 'test-lighthouse',
                    filepath: path.resolve('./static/sw.js'),
                    staticFileGlobs: ['static/**/*'],
                    minify: true,
                    staticFileGlobsIgnorePatterns: [/\.next\//],
                    runtimeCaching: [{
                        handler: 'fastest',
                        urlPattern: /[.](png|jpg|css)/
                    },{
                        handler: 'networkFirst',
                        urlPattern: /^http.*/
                    }]
                })
            ]
        }

        return config
    },
    target: 'serverless'
}