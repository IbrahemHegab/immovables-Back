const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const requestIp = require('request-ip');
const dbCollection = require("./Config/config");
const globalError = require("./Middleware/globalError");


const ApiError = require("./Resuble/ApiErrors");
const path = require("path");
const { createFirstManegerAccount } = require("./Service/AuthService");
const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
dotenv.config({ path: "config.env" });

dbCollection();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(useragent.express());
app.use(requestIp.mw());
// app.use("/api/v1/auth", RoutesAuth);

//  createFirstManegerAccount()
const PORT = process.env.PORT || 8008; 
const server = app.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
}); 
app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry This URL ${req.originalUrl} does not exist`, 400));
});
app.use(globalError);
