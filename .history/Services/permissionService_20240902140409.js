const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

exports.deletePermission = (model) =>
  expressAsyncHandler(async (req, res) => {
   
    await model.updateOne(
      { _id: req.params.id }, // الشرط
      { $unset: { password: "" } } // إزالة حقل كلمة المرور
    );
  });

exports.updateUser = factory.updateOne(createUsersModel);
