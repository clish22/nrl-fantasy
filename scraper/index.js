const { questionPromise } = require('./utils/readline-interface.js');
const { clearCollection } = require('./src/clear-collection.js');
const { db } = require('./utils/db.js');

async function main() {
  const options = ['clear collection', 'exit'];
  const action = await questionPromise(
    `What would you like to do? \n- ${options.join('\n- ')}\nAction:  `
  );

  switch (action) {
    case 'clear collection':
      await clearCollection();
      main();
      break;
    case 'exit':
      process.exit();
      break;
    default:
      console.log('Invalid action.');
      main();
  }
}

main().catch((error) => {
  console.error(error);
});
