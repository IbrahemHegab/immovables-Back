// const mongoose = require("mongoose");

// const dbCollection = () => {
//   mongoose
//     .connect(process.env.DB_URL)
//     .then(() => console.log("Connected"))
   
// };

// module.exports = dbCollection;
const { MongoClient } = require('mongodb');

async function dbCollection() {
  // URL الاتصال بـ MongoDB
  const url = 'mongodb://localhost:27017';

  // اسم قاعدة البيانات التي تريد الاتصال بها
  const dbName = 'mydatabase';

  // إنشاء عميل MongoDB جديد
  const client = new MongoClient(url);

  try {
    // الاتصال بقاعدة البيانات
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // يمكنك هنا تنفيذ عمليات على قاعدة البيانات، مثل الإضافة أو الاستعلام

  } catch (err) {
    console.error(err);
  } finally {
    // إغلاق الاتصال
    await client.close();
  }
}
module.exports = dbCollection;