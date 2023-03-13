// import modules
const express = require('express');
const app = express();
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 3001;

//middleware
app.use(express.static(path.join(__dirname, '../client/dist')));

//routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// use cheerio to scrape data from website when /api/nrl is requested using async/await
app.get('/api/nrl', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.nrl.com/ladder/?competition=111&round=2&season=2023'
    );
    const $ = cheerio.load(response.data);

    // const data = [];
    // find one piece of data as a test
    // const test = $('.ladder__row').find('.ladder__item').text();

    console.log($('[q-component="ladder-body-row"]'));
    /*     $('.ladder__table tbody tr').each((i, element) => {
      console.log($(element).find('.ladder__team').text());
      data.push({
        team: $(element).find('.ladder__team').text(),
        played: $(element).find('.ladder__played').text(),
        won: $(element).find('.ladder__won').text(),
        drawn: $(element).find('.ladder__drawn').text(),
        lost: $(element).find('.ladder__lost').text(),
        for: $(element).find('.ladder__for').text(),
        against: $(element).find('.ladder__against').text(),
        points: $(element).find('.ladder__points').text(),
      });
    }); */
    // res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
