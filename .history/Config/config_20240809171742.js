// const mongoose = require("mongoose");

// const dbCollection = () => {
//   mongoose
//     .connect(process.env.DB_URL)
//     .then(() => console.log("Connected"))

// };

// module.exports = dbCollection;
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "mydatabase";
let client;

async function connectToDatabase() {
  if (client) return client; // Return existing client if already connected

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

module.exports = { connectToDatabase };
