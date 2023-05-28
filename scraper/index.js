const { questionPromise } = require('./utils/readline-interface.js');
const { clearCollection } = require('./src/clear-collection.js');

async function main() {
  const options = {
    'clear collection': clearCollection,
    exit: process.exit,
  };
  const optionKeys = Object.keys(options);
  const optionValues = Object.values(options);
  const action = await questionPromise(
    `What would you like to do? \n- ${optionValues.join('\n- ')}\nAction:  `
  );

  optionKeys.forEach((option) => {
    if (action === option) {
      options[option]();
    } else {
      console.log('Invalid action.');
      process.exit();
    }
  });
}

main().catch((error) => {
  console.error(error);
});
