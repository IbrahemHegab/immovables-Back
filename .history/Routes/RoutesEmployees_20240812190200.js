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

const Routes = Router();

/
Routes.route("/").post(createUserValidation, createUsers).get(getUsers);
// Routes.route("/verifycode").post(verifyRegister);
// Routes.route("/addpoint/:id").put(updateUserPoint);
Routes.route("/:id")
  .get(getValidator, getUser)
  .delete(deleteValidator, deleteUser)
  .put(updateValidator, updateUser);
module.exports = Routes;
