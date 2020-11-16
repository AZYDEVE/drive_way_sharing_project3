const { MongoClient } = require("mongodb");
const dataFile = require("../routes");

function MyDB() {
  const myDB = {};

  const uri =
    process.env.MONGO_URL || "mongodb://localhost:27017";
  

  myDB.initializeUsers = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db("db");
    const users = db.collection("users");
    return users;
  };

  myDB.getUsers = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    //database
    const db = client.db("db");
    //collection
    const users = db.collection("users");

    const query = {};
    return users
      .find(query)
      .toArray()
      .finally(() => client.close());
  };

  return myDB;
}

module.exports = MyDB();
