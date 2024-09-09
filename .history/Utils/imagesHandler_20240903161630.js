const expressAsyncHandler = require("express-async-handler");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const { UploadMultiImage } = require("../Middleware/UploadImageMiddleware");
const fs = require("fs");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const expressAsyncHandler = require("express-async-handler");

// تأكد من أن المجلد موجود أو أنشئه
const ensureUploadDirExists = (type) => {
  const dir = `uploads/${type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

exports.resizeImage = (type) =>
  expressAsyncHandler(async (req, res, next) => {
    if (req.files.images) {
      req.body.images = [];

      // تأكد من أن المجلد موجود
      ensureUploadDirExists(type);

      await Promise.all(
        req.files.images.map(async (ele, inx) => {
          const filename = `${type}-${uuidv4()}-${Date.now()}-${inx + 1}.jpeg`;

          await sharp(ele.buffer)
            .resize(750, 750)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/${type}/${filename}`);

          req.body.images.push({
            image: filename,
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
