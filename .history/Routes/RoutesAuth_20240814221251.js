const { Router } = require("express");

const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const {
  SingUp,
  Login,
  forgetPassword,
  restCodeSent,
  restNewPassword,
  resendCodeVerify,
  protect,
} = require("../Service/AuthService");

const {

} = require("../Resuble/UsersvalidatorError");
const { createUserValidation } = require("../Resuble/UserValidation");

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
Routes.route("/login").post(LoginValidator, Login);
// Routes.post("/forgetPassword", forgetPassword);
// Routes.post("/restCode", restCodeSent);
// Routes.put("/setNewPassword", restNewPassword("password"));

//   .put(uploadImage,resizeImageUsers,updateOneUserValidator, updateUser)
//   .delete(deleteOneUserValidator, deleteUser);
module.exports = Routes;
