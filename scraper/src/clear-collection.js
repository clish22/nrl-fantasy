const { connectDB, disconnectDB } = require('../utils/db.js');
const { rl, questionPromise } = require('../utils/readline-interface.js');

async function clearCollection() {
  try {
    const db = await connectDB();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    const collectionName = await questionPromise(
      `Which collection would you like to clear?\n(${collectionNames.join(', ')})\nCollection:  `
    );

    if (collectionNames.includes(collectionName)) {
      await db.collection(collectionName).deleteMany({});
      console.log(`\nThe collection, '${collectionName}' has been cleared of all documents.`);
      await disconnectDB();
    } else {
      console.log(`\nThe collection, '${collectionName}' does not exist.`);
      await disconnectDB();
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { clearCollection };
