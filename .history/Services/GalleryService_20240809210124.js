const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const createGallerysModel = require("../Modules/createGallery");


exports.createGallery = expressAsyncHandler(async (req, res) => {
  const gallery = await createGallerysModel.create(req.body);

  await gallery.save();
  res.status(200).json({
    status: "success",
    data: gallery,
  });
});

exports.getUsers = factory.getAll(createUsersModel);
exports.getUser = factory.getOne(createUsersModel);

exports.deleteUser =expressAsyncHandler(async (req, res, next) => {
  const deleteDoc = await createUsersModel.findByIdAndDelete(req.params.id);
  const baseUrl = `${process.env.BASE_URL}/admin/`;

  if (!deleteDoc) {
    return next(
      new ApiError(`Sorry Can't Delete This ID :${req.params.id}`, 404)
    );
  }
  if (deleteDoc.image) {
    const relativePathimage = deleteDoc.image.replace(baseUrl, "");
    const filePathImage = path.join(
      __dirname,
      "../uploads/admin",
      relativePathimage
    );
    fsRemove(filePathImage);
  }
  res.status(200).json({ message: "Delete Success", data: deleteDoc });
});


exports.updateUser = factory.updateOne(createUsersModel)
