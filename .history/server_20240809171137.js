const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const dbCollection = require("./Config/config");
const globalError = require("./Middleware/globalError");
const RoutesUser = require("./Routes/RoutesUsers")
const ApiError = require("./Resuble/ApiErrors");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
dotenv.config({ path: "config.env" });

// dbCollection();
const url = 'mongodb://localhost:27017';

// اسم قاعدة البيانات التي تريد الاتصال بها
const dbName = 'mydatabase';

// إنشاء عميل MongoDB جديد
const client = new MongoClient(url);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use("/api/v1/user", RoutesUser);

//  createFirstManegerAccount()
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
});
app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry This URL ${req.originalUrl} does not exist`, 400));
});
app.use(globalError);
