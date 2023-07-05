const puppeteer = require('puppeteer');
const { connectDB, disconnectDB } = require('../utils/db.js');

async function scrapeTeams() {
  try {
    const db = await connectDB();
    const teams = await db.collection('teams').find({}).toArray();
    console.log('Teams found and returned.');

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
          scrapeObject.stadium = [findDtElement('Stadium:').split(' - ')[0].trim()];
        } else {
          scrapeObject.stadium = [findDtElement('Stadium:')];
        }

        // scrape nickname
        scrapeObject.nickname = findDtElement('Nickname:');

        // scrape members
        if (findDtElement('Members:') === '-') {
          scrapeObject.members = 'N/A';
        } else {
          scrapeObject.members = Number(findDtElement('Members:').replace(/,/g, ''));
        }

        return scrapeObject;
      });

      // each scraped object gets sent to the databse
      try {
        await db.collection('teams').updateOne(
          { _id: team._id },
          {
            $set: {
              founded: scraped.founded,
              stadium: scraped.stadium,
              nickname: scraped.nickname,
              members: scraped.members,
            },
          }
        );
        console.log(`${team.teamName} updated on the database.`);
      } catch (err) {
        console.log(err);
      }
      console.log(scraped);
    }

    await browser.close();
    await disconnectDB();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scrapeTeams };
