const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "mydatabase"; // اسم قاعدة البيانات
const collectionName = "mycollection"; // اسم المجموعة

let client;

async function connectToDatabase() {
  if (client) return client.db(dbName);

  client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(dbName); // Return the database object
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

async function insertData() {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName); // اسم المجموعة

  // Adding a single document
  const singleInsertResult = await collection.insertOne({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
  });
  console.log("Inserted single document:", singleInsertResult.insertedId);

  // Adding multiple documents
  const multipleInsertResult = await collection.insertMany([
    { name: "Jane Doe", age: 25, email: "jane.doe@example.com" },
    { name: "Mike Smith", age: 40, email: "mike.smith@example.com" }
  ]);
  console.log("Inserted multiple documents:", multipleInsertResult.insertedIds);
}

module.exports = { connectToDatabase, insertData };
