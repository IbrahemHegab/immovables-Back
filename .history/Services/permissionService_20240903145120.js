const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");


// دالة لحذف كلمة المرور
exports.deletePermission = (model) =>
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    // التحقق مما إذا كان المستخدم موجودًا
    const user = await model.findById(id);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // حذف كلمة المرور
    await model.updateOne(
      { _id: id }, // الشرط
      { $unset: { password: "", username: "" } } // إزالة حقل كلمة المرور
    );

    // إعادة استجابة النجاح
    res.status(200).json({ msg: "تم حذف كلمه السر واسم المستخدم" });
  });

exports.updateUser = factory.updateOne(createUsersModel);
