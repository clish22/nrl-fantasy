const puppeteer = require('puppeteer');
const { connectDB, disconnectDB } = require('../utils/db.js');

async function scrapeTeams() {
  try {
    const db = await connectDB();

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const url = 'https://www.nrl.com/clubs/';
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('main.l-page-primary');
    const teams = await page.evaluate(() => {
      const teamsList = [];
      const teamsCards = document.querySelectorAll('.club-card-content__inner');
      for (teamCard of teamsCards) {
        const team = {};
        if (teamCard.children[0].innerText.includes('\n')) {
          team.teamName = teamCard.children[0].innerText.replace('\n', ' ').trim();
        } else {
          team.teamName = teamCard.children[0].innerText.trim();
        }
        team.clubURL = teamCard.children[2].children[0].href;
        team.nrlURL = teamCard.children[3].href;
        teamsList.push(team);
      }
      return teamsList;
    });

    for (team of teams) {
      await page.goto(team.nrlURL, { waitUntil: 'networkidle2' });
      await page.waitForSelector('main.l-page-primary');

      const scraped = await page.evaluate(() => {
        function findDtElement(dtInnerText) {
          const elements = document.querySelectorAll('dt');
          const element = [...elements].find((element) => element.innerText === dtInnerText);
          const elementSibling = element.nextElementSibling;
          const siblingInnerText = elementSibling.innerText;
          return siblingInnerText;
        }

        const scrapeObject = {};
        scrapeObject.founded = Number(findDtElement('Founded:'));
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
        scrapeObject.nickname = findDtElement('Nickname:');
        if (findDtElement('Members:') === '-') {
          scrapeObject.members = 'N/A';
        } else {
          scrapeObject.members = Number(findDtElement('Members:').replace(/,/g, ''));
        }
        return scrapeObject;
      });

      team.founded = scraped.founded;
      team.stadium = scraped.stadium;
      team.nickname = scraped.nickname;
      team.members = scraped.members;

      console.log('\x1b[38;5;10m%s\x1b[0m', 'Scraped:');
      console.log(
        `${team.teamName} \n ${team.clubURL} \n ${team.nrlURL} \n ${team.founded} \n ${team.stadium} \n ${team.nickname} \n ${team.members}`
      );
      console.log('\x1b[38;5;10m%s\x1b[0m', 'Sending to database...');

      const filter = { teamName: team.teamName };
      const update = { $set: team };
      const options = { upsert: true };
      const result = await db.collection('teams').updateOne(filter, update, options);
      console.log(`${team.teamName} updated on the database.`);
    }
    await browser.close();
    await disconnectDB();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scrapeTeams };
