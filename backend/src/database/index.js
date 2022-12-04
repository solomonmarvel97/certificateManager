const { MongoClient } = require('mongodb');
// or as an es module:

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'certificateManagerDB';

  client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName)

module.exports = {
    db
}