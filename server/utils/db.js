const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(url, config);
    console.log('MongoDB connected!');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message);
  }
};

const db = mongoose.connection;

module.exports = { db, connectDB };
