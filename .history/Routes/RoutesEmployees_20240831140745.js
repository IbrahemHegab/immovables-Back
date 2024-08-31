const { Router } = require("express");

const {
  createEmployees,
  getEmployeess,
  getEmployees,
  deleteEmployees,
  updateEmployees,
  getNotifications,
} = require("../Services/EmployeesService");
const { protect, getLoggedUserData } = require("../Services/AuthService");
const { deleteSpecificNotifcation } = require("../Services/TasksService");

const Routes = Router();
Routes.use(protect);

Routes.route("/").post(createEmployees).get(getEmployeess);
Routes.route("/notifcation/:id").delete(deleteE);

Routes.route("/:id")
  .get(getEmployees)
  .delete(deleteEmployees)
  .put(updateEmployees);
module.exports = Routes;
