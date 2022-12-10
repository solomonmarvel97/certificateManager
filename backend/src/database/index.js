const { Client } = require("redis-om");
let REDIS_URL = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const client = new Client();

// open client
client.open(REDIS_URL).then(() => {
    console.log('Connected successfully to redis database');
}).catch(err => {
    console.log(err)
})

module.exports.db = client