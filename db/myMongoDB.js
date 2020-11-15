const { MongoClient } = require("mongodb");
const dataFile = require("../routes");

function MyDB() {
  const myDB = {};

  const uri =
    process.env.MONGO_URL || "mongodb://localhost:27017";
  myDB.getPosts = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    //database
    const db = client.db("db");
    //collection
    const dog_info = db.collection("dog_info");

    const query = {};
    return dog_info
      .find(query)
      .toArray()
      .finally(() => client.close());
  };

  myDB.getDogs = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    //database
    const db = client.db("db");
    //collection
    const dog_info = db.collection("dog_info");

    return dog_info;
  };

  myDB.getLikes = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    //database
    const db = client.db("db");
    //collection
    const dog_info = db.collection("dog_info");

    const query2 = ({}, { likes: 1, _id: 0 });
    return dog_info
      .find(query2)
      .toArray()
      .finally(() => client.close());
  };

  myDB.initialize = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    //database
    const db = client.db("db");
    //collection
    const dog_info = db.collection("dog_info");
    let ids = dataFile.ids;
    let scraperFunction = dataFile.scraperFunction;
    for (let i = 0; i < ids.length; i++) {
      let element = await scraperFunction(ids[i], i);
      console.log(element);
      await dog_info.insertOne({
        name: element.name,
        gender: element.gender,
        breed: element.breed,
        age: element.age,
        link: element.link,
        picLink: element.picLink,
        likes: 0,
      });
    }
  };

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
