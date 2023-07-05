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
    console.log('\x1b[38;5;216m%s\x1b[0m', 'DB Connected.');
    return db;
  } catch (err) {
    console.log(err);
  }
}

async function disconnectDB() {
  try {
    await client.close();
    console.log('\x1b[38;5;216m%s\x1b[0m', 'DB Disconnected.');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connectDB, disconnectDB };
