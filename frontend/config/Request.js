let axios = require('axios');

module.exports = class Request {
    static async init(config) {
        return await axios(config)
    }
}