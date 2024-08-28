const { Router } = require("express");

const {
  createEmployees,
  getEmployeess,
  getEmployees,
  deleteEmployees,
  updateEmployees,
} = require("../Services/EmployeesService");
const { protect, getLoggedUserData } = require("../Services/AuthService");


const Routes = Router();
Routes.use(protect);

Routes.route("/").post(createEmployees).get(getEmployeess);
Routes.route("/notifications").get(getNotifications);

Routes.route("/:id")
  .get(getEmployees)
  .delete(deleteEmployees)
  .put(updateEmployees);
module.exports = Routes;
