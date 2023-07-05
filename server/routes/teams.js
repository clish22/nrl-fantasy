const express = require('express');
const path = require('path');
const router = express.Router();
const { connectDB, disconnectDB } = require('../utils/db');

// serve all files from public/logos folder.
router.use(express.static(path.join(__dirname, '../public')));

// /teams route handlers
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const data = await db.collection('teams').find({}).toArray();
    console.log('Teams found and returned.');
    res.json(data);
    disconnectDB();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
