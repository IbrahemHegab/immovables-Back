// const mongoose = require("mongoose");

// const dbCollection = () => {
//   mongoose
//     .connect(process.env.DB_URL)
//     .then(() => console.log("Connected"))

// };

// module.exports = dbCollection;
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "DB";
let client;

async function connectToDatabase() {
  if (client) return client;

  client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

async function insertData() {
  const db = await connectToDatabase();
  const collection = db.collection('mycollection'); // اسم المجموعة (Collection) التي تريد إضافة البيانات إليها

  // إضافة مستند واحد
  const singleInsertResult = await collection.insertOne({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
  });
  console.log("Inserted single document:", singleInsertResult.insertedId);

  // إضافة مستندات متعددة
  const multipleInsertResult = await collection.insertMany([
    { name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
    { name: "Mike Smith", age: 40, email: "mike.smith@example.com" }
  ]);
  console.log("Inserted multiple documents:", multipleInsertResult.insertedIds);
}

module.exports = { connectToDatabase, insertData };

