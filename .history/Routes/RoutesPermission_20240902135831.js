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
const { protect, getLoggedUserData } = require("../Services/AuthService");

const Routes = Router();

// Only Access the Logged Users
Routes.use(protect);
Routes.get("/getMe", getLoggedUserData, (req, res, next) => {
  const model = req.model;
  getUser(model)(req, res, next);
});

Routes.route("/").put(createUserValidation, createUsers).get(getUsers);

module.exports = Routes;
