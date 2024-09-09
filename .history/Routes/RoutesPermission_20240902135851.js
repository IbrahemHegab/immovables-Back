const { Router } = require("express");
const {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../Services/UsersService");
const { createUserValidation } = require("../Resuble/UserValidation");
const {
  getValidator,
  deleteValidator,
  updateValidator,
} = require("../Resuble/ResubleValidation");
const { protect } = require("../Services/AuthService");
const { deletePermission } = require("../Services/permissionService");

const Routes = Router();

// Only Access the Logged Users
Routes.use(protect);


Routes.route("/").put( deletePermission)

module.exports = Routes;
