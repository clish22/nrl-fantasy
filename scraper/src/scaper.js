// scrape this website https://www.nrl.com/players/?competition=111&team=500011 for the names of nrl players using Puppeteer. Return the names as an array of strings.

const axios = require('axios');
const puppeteer = require('puppeteer');

const url = 'https://www.nrl.com/players/?competition=111&team=500011';

const getPlayers = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const players = await page.evaluate(() => {
    const playerNames = Array.from(document.querySelectorAll('.nrl-player-card__name'));

    return playerNames.map((player) => player.innerText);
  });

  await browser.close();
  console.log(players);
  return players;
};

module.exports = getPlayers;
