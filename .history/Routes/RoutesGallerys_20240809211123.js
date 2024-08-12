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
const {
  createGallery,
  getGallerys,
  getGallery,
  deleteGallery,
  updateGallery,
} = require("../Services/GalleryService");




const Routes = Router();

// Only Access the Logged Users
// Routes.use(protect);
// Routes.get("/getMe", getLoggedUserData, getUser);

// Routes.put("/changeUserPassword", UpdateUserPassword, updateLoggedUserPassword);

// // Only Access the Admin

// Routes.route("/updateUseRole/:id").put(updateUserRole);
// Routes.route("/updateUserStatus/:id").put(updateUserStatus);

// Routes.use(allowedTo("admin", "manager"));
Routes.route("/").post(createGallery).get(getGallerys);
// Routes.route("/verifycode").post(verifyRegister);
// Routes.route("/addpoint/:id").put(updateUserPoint);
Routes.route("/:id")
  .get(getValidator, getGallery)
  .delete(deleteValidator, deleteGallery)
  .put(updateValidator, updateGallery);
module.exports = Routes;
