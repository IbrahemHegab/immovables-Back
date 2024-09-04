const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const createGallerysModel = require("../Modules/createGallery");

exports.createGallery = expressAsyncHandler(async (req, res) => {
  const gallery = await createGallerysModel.create(req.body);

  res.status(200).json({
    status: "success",
    data: gallery,
  });
});

exports.getGallerys = factory.getAll(createGallerysModel);
exports.getGallery = factory.getOne(createGallerysModel);
const path = require("path");
const fs = require("fs");

exports.deleteGallery = expressAsyncHandler(async (req, res, next) => {
  const deleteDoc = await createGallerysModel.findByIdAndDelete(req.params.id);
  const baseUrl = `${process.env.BASE_URL}/admin/`;

  if (!deleteDoc) {
    return next(
      new ApiError(`Sorry Can't Delete This ID: ${req.params.id}`, 404)
    );
  }
  console.log(deleteDoc);
  // حذف الصور إذا كانت موجودة
  if (deleteDoc.images && typeof deleteDoc.images === "object") {
    for (const key in deleteDoc.images) {
      if (deleteDoc.images.hasOwnProperty(key)) {
        const relativePathImage = deleteDoc.images[key].image.replace(baseUrl, "");

        const filePathImage = path.resolve(
          __dirname,
          "../uploads/gallery",
          relativePathImage
        );
        console.log(relativePathImage, filePathImage);
        // التحقق مما إذا كان الملف موجودًا قبل محاولة حذفه
        if (fs.existsSync(filePathImage)) {
          try {
            fs.unlinkSync(filePathImage); // حذف الملف
          } catch (error) {
            return next(
              new ApiError(`Error deleting the image: ${error.message}`, 500)
            );
          }
        }
      }
    }
  }

  res.status(200).json({ message: "Delete Success", data: deleteDoc });
});

exports.updateGallery = factory.updateOne(createGallerysModel, "gallery");
