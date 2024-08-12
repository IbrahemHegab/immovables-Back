const { Router } = require("express");



const { createEmployees, getEmployeess, getEmployees, deleteEmployees, updateEmployees } = require("../Services/EmployeesService");

const Routes = Router();


Routes.route("/").post( createEmployees).get(getEmployeess);

Routes.route("/:id")
  .get( getEmployees)
  .delete( deleteEmployees)
  .put( updateEmployees);
module.exports = Routes;
