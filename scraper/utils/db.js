const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const config = { useUnifiedTopology: true };
const dbName = 'nrl-fantasy';

const client = new MongoClient(url, config);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log('\nDB Connected.\n');
    return db;
  } catch (err) {
    console.log(err);
  }
}

async function disconnectDB() {
  try {
    await client.close();
    console.log('\nDB Disconnected.\n');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connectDB, disconnectDB };
