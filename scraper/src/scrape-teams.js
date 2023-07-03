const puppeteer = require('puppeteer');
const parse5 = require('parse5');
const fs = require('fs');
const { connectDB, disconnectDB } = require('../utils/db.js');

const teamURL = {
  'Brisbane Broncos': 'https://www.nrl.com/clubs/brisbane-broncos/',
  'Canberra Raiders': 'https://www.nrl.com/clubs/canberra-raiders/',
  'Canterbury-Bankstown Bulldogs': 'https://www.nrl.com/clubs/canterbury-bankstown-bulldogs/',
  'Cronulla-Sutherland Sharks': 'https://www.nrl.com/clubs/cronulla-sutherland-sharks/',
  'Gold Coast Titans': 'https://www.nrl.com/clubs/gold-coast-titans/',
  'Manly-Warringah Sea Eagles': 'https://www.nrl.com/clubs/manly-warringah-sea-eagles/',
  'Melbourne Storm': 'https://www.nrl.com/clubs/melbourne-storm/',
  'Newcastle Knights': 'https://www.nrl.com/clubs/newcastle-knights/',
  'New Zealand Warriors': 'https://www.nrl.com/clubs/new-zealand-warriors/',
  'North Queensland Cowboys': 'https://www.nrl.com/clubs/north-queensland-cowboys/',
  'Parramatta Eels': 'https://www.nrl.com/clubs/parramatta-eels/',
};

async function scrapeTeams() {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#draw-content');
    const draw = await page.evaluate(() => {
      const findDraw = document.querySelector('#draw-content');
      const outerHTML = findDraw.outerHTML;
      return outerHTML;
    });

    const drawDOM = parse5.parse(draw);

    const pTags = [];
    findPTags(drawDOM, pTags);
    console.log(pTags);
    // const drawJSON = convertNodeToJSON(drawDOM);

    const db = await connectDB();

    // insert into db

    await disconnectDB();

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scrapeTeams };
