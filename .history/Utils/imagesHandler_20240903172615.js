const expressAsyncHandler = require("express-async-handler");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { UploadMultiImage } = require("../Middleware/UploadImageMiddleware");
const fs = require("fs");
const ensureUploadDirExists = (type) => {
  const dir = `uploads/${type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

exports.resizeImage = (type) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!req.files || !req.files.images || req.files.images.length === 0) {
      // إذا لم يكن هناك صور مرفوعة، يمكن متابعة الطلب بدون أي معالجة للصور
      return next();
    }

    req.body.images = [];

    // تأكد من أن المجلد موجود
    ensureUploadDirExists(type);

    await Promise.all(
      req.files.images.map(async (ele, inx) => {
        const imageType = ele.mimetype.split("image/")[1] || "jpeg";
        const filename = `${type}-${uuidv4()}-${Date.now()}-${inx + 1}.${imageType}`;

        await sharp(ele.buffer)
          .resize(1024, 1024)
          .toFormat(imageType)
          .jpeg({ quality: 95 })
          .toFile(`uploads/${type}/${filename}`);

        req.body.images.push({
          image: filename,
        });
      })
    );

    next();
  });
``

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
