const { Router } = require("express");
const { createUsers ,getUsers ,getUser ,deleteUser} = require("../Services/UsersService");
const { createUserValidation ,getOneUserValidator ,deleteOneUserValidator ,updateOneUserValidator } = require("../Resuble/UserValidation");
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
// Routes.use(protect);
// Routes.get("/getMe", getLoggedUserData, getUser);

// Routes.put("/changeUserPassword", UpdateUserPassword, updateLoggedUserPassword);

// // Only Access the Admin

// Routes.route("/updateUseRole/:id").put(updateUserRole);
// Routes.route("/updateUserStatus/:id").put(updateUserStatus);

// Routes.use(allowedTo("admin", "manager"));
Routes.route("/").post(createUserValidation, createUsers).get(getUsers);
// Routes.route("/verifycode").post(verifyRegister);
// Routes.route("/addpoint/:id").put(updateUserPoint);
Routes.route("/:id")
.get(getOneUserValidator, getUser)
.delete( deleteOneUserValidator, deleteUser)
  .put(
    updateOneUserValidator,
    updateUser
  );
module.exports = Routes;
