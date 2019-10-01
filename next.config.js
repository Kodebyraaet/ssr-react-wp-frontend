require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

//const withOffline = require('next-offline')

const config = {
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

        return config
    },

    target: 'serverless',

    //transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    //generateInDevMode: true, // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we turn on the SW in dev mode so that we can actually test it
    /*workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [{
            urlPattern: /^https?.*/   /*,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                    maxEntries: 150,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                },
                cacheableResponse: {
                    statuses: [0, 200],
                }
            }
        }]
    }*/
}

//module.exports = withOffline(config)
module.exports = config