const { Router } = require("express");

const { LoginValidator } = require("../Resuble/AuthvalidatorError");

const { SingUp, Login } = require("../Services/AuthService");

// const {
//   createUsersValidator,
//   getOneUserValidator,
//   updateOneUserValidator,
//   deleteOneUserValidator,
//   UpdateUserPassword,
// } = require("../Resuble/UsersvalidatorError");

const Routes = Router();

Routes.route("/signup").post(
  
  SingUp
);
// Routes.route("/verifycode").post(verifyRegister);
// Routes.route("/resendVerifycode").post(protect, resendCodeVerify);
Routes.route("/login").post(LoginValidator,(req, res, next) => {
  const model = req.model;
  updateLoggedUserPassword(model)(req, res, next);
} );
// Routes.post("/forgetPassword", forgetPassword);
// Routes.post("/restCode", restCodeSent);
// Routes.put("/setNewPassword", restNewPassword("password"));

//   .put(uploadImage,resizeImageUsers,updateOneUserValidator, updateUser)
//   .delete(deleteOneUserValidator, deleteUser);
module.exports = Routes;
