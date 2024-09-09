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

} = require("../Services/GalleryService");
const { UploadImageService, resizeImage } = require("../Utils/imagesHandler");

const Routes = Router();

Routes.route("/")
  .post(UploadImageService, resizeImage, createGallery)
  .get(getGallerys);

Routes.route("/:id")
  .get(getValidator, getGallery)
  .delete(deleteValidator, deleteGallery)
  .put( updateValidator, updateGallery);
module.exports = Routes;
 