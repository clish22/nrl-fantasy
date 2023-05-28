// import modules
const express = require('express');
const app = express();
const { db, connectDB } = require('./utils/db');
require('dotenv').config();
connectDB();

const port = process.env.PORT || 3001;

app.get('/api/nrl', async (req, res) => {
  // fetch data from database
  const data = await db.collection('teams').findOne({ CLUB: 'Brisbane Broncos' });
  res.json(data);
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
