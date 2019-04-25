require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    webpack: (config, options) => {

        // absolute imports
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['api'] = path.join(__dirname, 'api')
        config.resolve.alias['css'] = path.join(__dirname, 'css')

        // .env support for local development and node servers
        config.plugins = [
            ...(config.plugins || []),
            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ]

        // service worker
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                cacheId: 'ssr-react-wp',
                verbose: true,
                filepath: path.resolve('./static/service-worker.js'),
                staticFileGlobs: ['static/**/*'],
                minify: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                runtimeCaching: [
                    { handler: 'networkFirst', urlPattern: /^https?.*/ }
                ]
            })
        )

        return config
    },
    target: 'serverless'
}