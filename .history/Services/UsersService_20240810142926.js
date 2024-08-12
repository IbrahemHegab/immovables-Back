const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

// exports.resizeImage = (type) =>
//   expressAsyncHandler(async (req, res, next) => {
//     const imageType = req.file.mimetype.split("image/")[1];
//     if (req.file) {
//       const filename = `${type}-${uuidv4()}-${Date.now()}.${
//         imageType ? imageType : "jpeg"
//       }`;
//       await sharp(req.file.buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 70 })
//         .toFile(`uploads/${type}/${filename}`);
//       req.body.image = filename;
//     }
//     next();
//   });

// exports.uploadImage = UploadSingleImage("image");
// exports.fsRemove = async (filePath) => {
//   if (!filePath) return;
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(" Faild Delete:", err);
//     } else {
//       console.log("Delete Is Success in local filesystem");
//     }
//   });
// };

exports.createUsers = expressAsyncHandler(async (req, res) => {
  const user = await createUsersModel.create(req.body);
  const id = Math.floor(1000000 + Math.random() * 900000).toString();
  user.id = id;
  await user.save();
  res.status(200).json({
    status: "success",
    data: user,
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
