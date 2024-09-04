const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const createGallerysModel = require("../Modules/createGallery");
const { UploadMultiImage } = require("../Middleware/UploadImageMiddleware");


exports.createGallery = expressAsyncHandler(async (req, res) => {
  const gallery = await createGallerysModel.create(req.body);

  res.status(200).json({
    status: "success",
    data: gallery,
  });
});

exports.getGallerys = factory.getAll(createGallerysModel);
exports.getGallery = factory.getOne(createGallerysModel);

exports.deleteGallery = expressAsyncHandler(async (req, res, next) => {
  const deleteDoc = await createGallerysModel.findByIdAndDelete(req.params.id);
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

exports.updateGallery = factory.updateOne(createGallerysModel);
