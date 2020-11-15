const { MongoClient } = require("mongodb");

const mongo = () => {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  return client;
};

module.exports = {
  getData: async (databaseName, collection, query) => {
    console.log(query);
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    const data = await collections.find(query).toArray();
    client.close();
    return data;
  },

  insertData: async (databaseName, collection, insertingOBJ) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    try {
      await collections.insertOne(insertingOBJ);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },

  deleteData: async (databaseName, collection, queryToDelete) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);

    try {
      await collections.deleteOne(queryToDelete);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },
};
