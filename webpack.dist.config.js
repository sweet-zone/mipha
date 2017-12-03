
let config = require('../webpack.config.js')

config.plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = config