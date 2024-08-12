const { Router } = require("express");
const {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../Services/UsersService");
const {
  createUserValidation,
} = require("../Resuble/UserValidation");
const { getValidator, deleteValidator, updateValidator } = require("../Resuble/ResubleValidation");
const { createEmployees, getEmployeess, getEmployees, deleteEmployees, updateEmployees } = require("../Services/EmployeesService");

const Routes = Router();


Routes.route("/").post( createEmployees).get(getEmployeess);

Routes.route("/:id")
  .get(getValidator, getEmployees)
  .delete(deleteValidator, deleteEmployees)
  .put(updateValidator, updateEmployees);
module.exports = Routes;
