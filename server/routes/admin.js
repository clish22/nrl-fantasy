const express = require('express');
const router = express.Router();
const { connectDB, disconnectDB } = require('../utils/db');

// /admin route handlers
router.post('/', async (req, res) => {
  try {
    const db = await connectDB();
    const data = await db.collection('teams').insertOne(req.body);
    res.json(data);
    disconnectDB();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
