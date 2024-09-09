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
  resizeImageGallery,
  UploadImageService,
} = require("../Services/GalleryService");

const Routes = Router();

Routes.route("/")
  .post(UploadImageService, resizeImageGallery, createGallery)
  .get(getGallerys);

Routes.route("/:id")
  .get(getValidator, getGallery)
  .delete(deleteValidator, deleteGallery)
  .put( updateValidator, updateGallery);
module.exports = Routes;
 