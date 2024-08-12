const mongoose = require("mongoose");

const dbCollection = () => {
  // mongoose
  //   .connect(process.env.DB_URL)
  //   .then(() => console.log("Connected"))
  const url = 'mongodb://localhost:27017';

  // اسم قاعدة البيانات التي تريد الاتصال بها
  const dbName = 'mydatabase';

  // إنشاء عميل MongoDB جديد
  const client = new MongoClient(url);
};

module.exports = dbCollection;
