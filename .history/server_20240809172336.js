const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");


const globalError = require("./Middleware/globalError");
const RoutesUser = require("./Routes/RoutesUsers");
const ApiError = require("./Resuble/ApiErrors");
const path = require("path");
const { connectToDatabase ,insertData  } = require("./Config/config");

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
dotenv.config({ path: "config.env" });

// Connect to MongoDB
connectToDatabase().catch(err => {
  console.error("Error connecting to the database. Shutting down.");
  process.exit(1);
});

// Insert data (uncomment to use)
insertData().catch(console.error);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use("/api/v1/user", RoutesUser);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry, this URL ${req.originalUrl} does not exist`, 404));
});
app.use(globalError);
