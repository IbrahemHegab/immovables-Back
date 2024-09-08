const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const dbCollection = require("./Config/config");
const globalError = require("./Middleware/globalError");
const RoutesAuth = require("./Routes/RoutesAuth");
const RoutesUser = require("./Routes/RoutesUsers");
const RoutesEmployees = require("./Routes/RoutesEmployees");
const RoutesGallery = require("./Routes/RoutesGallerys");
const RoutesTask = require("./Routes/RoutesTasks");
const RoutesPermission = require("./Routes/RoutesPermission");
const ApiError = require("./Resuble/ApiErrors");
const path = require("path");
const { createFirstManagerAccount } = require("./Services/EmployeesService");

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
dotenv.config({ path: "config.env" });

dbCollection();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use("/api/v1/auth", RoutesAuth);
app.use("/api/v1/user", RoutesUser);
app.use("/api/v1/employees", RoutesEmployees);
app.use("/api/v1/gallery", RoutesGallery);
app.use("/api/v1/task", RoutesTask);
app.use("/api/v1/permission", RoutesPermission);
app.use("/api/v1/cart", RoutesCart);
createFirstManagerAccount()
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
});
app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry This URL ${req.originalUrl} does not exist`, 400));
});
app.use(globalError);
