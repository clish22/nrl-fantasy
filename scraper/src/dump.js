/* // example 1 from bing - go to nrl website and scrape names from the site.
const puppeteer = require('puppeteer');

let scrape = async () => {
  // Launch the browser and create a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the URL and wait for the page to load
  await page.goto('https://www.nrl.com/players/?competition=111&team=500011');
  await page.waitForSelector('.nrl-o-team-list__player-name');

  // Scrape the names of the players from the elements with class 'nrl-o-team-list__player-name'
  const names = await page.$$eval('.nrl-o-team-list__player-name', (elements) =>
    elements.map((el) => el.textContent)
  );

  // Close the browser and return the names
  browser.close();
  return names;
};

scrape().then((names) => {
  console.log(names); // Print the names
});

// example 2 from github copilot - go to nrl website and scrape names from the site.
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

  return players;
};

module.exports = getPlayers;
 */
