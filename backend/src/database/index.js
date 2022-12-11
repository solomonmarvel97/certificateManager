const { Client } = require("redis-om");
let REDIS_URL = AppConfig.REDIS_URL;

/* create and open the Redis OM Client */
const client = new Client();

// open client
client.open(REDIS_URL).catch(err => {
    console.log(err)
})

module.exports.db = client