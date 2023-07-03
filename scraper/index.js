const { questionPromise } = require('./utils/readline-interface.js');
const { clearCollection } = require('./src/clear-collection.js');

async function main() {
  const options = ['clear collection', 'scrape', 'exit'];
  const action = await questionPromise(
    `What would you like to do? \n- ${options.join('\n- ')}\nAction:  `
  );

  switch (action) {
    case 'clear collection':
      await clearCollection();
      main();
      break;
    case 'scrape':
      await scrapeLadder();
    case 'exit':
      process.exit();
    default:
      console.log('Invalid action.' + '\n');
      main();
  }
}

main().catch((error) => {
  console.error(error);
});
