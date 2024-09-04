const expressAsyncHandler = require("express-async-handler");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
exports.resizeImageGallery = expressAsyncHandler(async (req, res, next) => {
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (ele, inx) => {
        const imageGallery = `imageGallery-${uuidv4()}-${Date.now()}-${
          inx + 1
        }.jpeg`;

        await sharp(ele.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/gallery/${imageGallery}`);

        req.body.images.push({
          image: imageGallery,
        });
      })
    );

    next();
  }
});
exports.UploadImageService = UploadMultiImage([
  { name: "images", maxCount: 8 },
]);
exports.fsRemove = async (filePath) => {
  if (!filePath) return;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(" Faild Delete:", err);
    } else {
      console.log("Delete Is Success in local filesystem");
    }
  });
};

exports.filePathImage = (fileName, relativePathimage) => {
  const filePath = path.join(
    __dirname,
    `../uploads/${fileName}/`,
    relativePathimage
  );
  this.fsRemove(filePath);
};
