const puppeteer = require('puppeteer');
const { connectDB, disconnectDB } = require('../utils/db.js');

async function getTeams() {
  try {
    const db = await connectDB();
    const data = await db.collection('teams').find({}).toArray();
    console.log('Teams found and returned.');
    await disconnectDB();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function scrapeTeams() {
  try {
    const teams = await getTeams();

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (team of teams) {
      await page.goto(team.url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('main.l-page-primary');

      const scraped = await page.evaluate(() => {
        const findDtElement = (dtInnerText) => {
          const elements = document.querySelectorAll('dt');
          const element = [...elements].find((element) => element.innerText === dtInnerText);
          const elementSibling = element.nextElementSibling;
          const siblingInnerText = elementSibling.innerText;
          return siblingInnerText;
        };

        const scrapeObject = {};

        // scrape founded
        scrapeObject.founded = Number(findDtElement('Founded:'));

        // scrape stadium
        if (findDtElement('Stadium:').includes('\n')) {
          const stadiums = findDtElement('Stadium:').split('\n');
          const updatedStadiums = [];
          for (stadium of stadiums) {
            if (stadium.includes('-')) {
              updatedStadiums.push(stadium.split(' - ')[0].trim());
            } else {
              updatedStadiums.push(stadium);
            }
          }
          scrapeObject.stadium = updatedStadiums;
        } else if (findDtElement('Stadium:').includes('-')) {
          scrapeObject.stadium = findDtElement('Stadium:').split(' - ')[0].trim();
        } else {
          scrapeObject.stadium = findDtElement('Stadium:');
        }

        // scrape nickname
        scrapeObject.nickname = findDtElement('Nickname:');

        // scrape members
        if (findDtElement('Members:') === '-') {
          scrapeObject.members = 'N/A';
        } else {
          scrapeObject.members = findDtElement('Members:').replace(/,/g, '');
        }

        return scrapeObject;
      });
      console.log(scraped);
    }

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scrapeTeams };
