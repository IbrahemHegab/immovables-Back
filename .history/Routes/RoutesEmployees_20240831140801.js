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
const { deleteSpecificNotification } = require("../Services/TasksService");


const Routes = Router();
Routes.use(protect);

Routes.route("/").post(createEmployees).get(getEmployeess);
Routes.route("/notifcation/:id").delete(deleteSpecificNotification);

Routes.route("/:id")
  .get(getEmployees)
  .delete(deleteEmployees)
  .put(updateEmployees);
module.exports = Routes;
