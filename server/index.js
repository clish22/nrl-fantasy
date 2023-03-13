// import modules
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;

//middleware
app.use(express.static(path.join(__dirname, '../client/dist')));

//routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
