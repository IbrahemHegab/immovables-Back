const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const expressAsyncHandler = require('express-async-handler');

// دالة لحذف كلمة المرور
exports.deletePermission = (model) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    // التحقق مما إذا كان المستخدم موجودًا
    const user = await model.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // حذف كلمة المرور
    await model.updateOne(
      { _id: id },                 // الشرط
      { $unset: { password: "" } } // إزالة حقل كلمة المرور
    );

    // إعادة استجابة النجاح
    res.status(200).json({ message: 'Password removed successfully' });
  });


exports.updateUser = factory.updateOne(createUsersModel);
