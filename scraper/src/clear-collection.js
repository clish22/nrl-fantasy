const { db, connectDB, disconnectDB } = require('../utils/database.js');
const { rl, questionPromise } = require('../utils/readline-interface.js');

async function clearCollection() {
  const collectionName = await questionPromise('What collection would you like to clear?  ');
  try {
    //check if collection exists
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some((collection) => collection.name === collectionName);
    if (!collectionExists) {
      console.log(`The collection, '${collectionName}' does not exist.`);
      await disconnectDB();
      return;
    }

    await connectDB();
    await db.collection(collectionName).deleteMany({});
    console.log(`The collection, '${collectionName}' has been cleared of all documents.`);
    await disconnectDB();
  } catch (err) {
    console.log(err);
  }
  rl.close();
}

clearCollection().catch((error) => {
  console.error(error);
});

module.exports = { clearCollection };
