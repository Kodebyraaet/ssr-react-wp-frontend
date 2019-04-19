require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    webpack (config, options) {
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['api'] = path.join(__dirname, 'api')
        config.resolve.alias['css'] = path.join(__dirname, 'css')

        config.plugins = config.plugins || []

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ]

        return config
    }
}