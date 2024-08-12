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
const { createEmployees, getEmployeess } = require("../Services/EmployeesService");

const Routes = Router();


Routes.route("/").post(createUserValidation, createEmployees).get(getEmployeess);

Routes.route("/:id")
  .get(getValidator, get)
  .delete(deleteValidator, deleteUser)
  .put(updateValidator, updateUser);
module.exports = Routes;
