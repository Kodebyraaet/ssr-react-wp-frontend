const path = require('path')

module.exports = {
    webpack (config, options) {
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['api'] = path.join(__dirname, 'api')
        config.resolve.alias['css'] = path.join(__dirname, 'css')
        config.resolve.alias['images'] = path.join(__dirname, 'images')
        return config
    }
}