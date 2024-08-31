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
// const {
//   createUsersValidator,
//   UpdateUserPassword,
//   getOneUserValidator,
//   deleteOneUserValidator,
//   updateOneUserValidator,
// } = require("../Resuble/UsersvalidatorError");

// const { protect, allowedTo } = require("../Service/AuthService");
// const {
//   createUsersValidator,
//   getOneUserValidator,
//   updateOneUserValidator,
//   deleteOneUserValidator,
//   UpdateUserPassword,
//   updateLoggedUserValidator,
//   LoginDashboardValidator,
// } = require("../Resuble/UsersvalidatorError");

const Routes = Router();

// Only Access the Logged Users
 Routes.use(protect);
 Routes.get("/getMe", getLoggedUserData, (req, res, next) => {
  const model = req.model;
  getUser(model)(req, res, next);
});


Routes.route("/").post(createUserValidation, createUsers).get(getUsers);

Routes.route("/:id")
  .get(getValidator, getUser)
  .delete(deleteValidator, deleteUser)
  .put(updateValidator, updateUser);
module.exports = Routes;
