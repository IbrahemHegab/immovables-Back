const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");
const createEmployeesModel = require("../Modules/createEmployees");
exports.createFirstManagerAccount = async () => {
  const existingManager = await createEmployeesModel.findOne({
    username: "manager",
  });
  if (existingManager) {
    console.log("Manager account already exists");
    return;
  }

  const manager = await createUsersModel.create({
    name: "manager",
    username: "manager",
    phone: "01000000000",
  
    role: "manager",
    password: await bcrypt.hash("123456789", 12),
    confirmPassword: await bcrypt.hash("123456789", 12),
  });

  console.log("Manager account created successfully");
};
exports.createEmployees = expressAsyncHandler(async (req, res) => {

  const Employees = await createEmployeesModel.create(req.body);
  await Employees.save();
  res.status(200).json({
    status: "success",
    data: Employees,
  });
});

exports.getEmployeess = factory.getAll(createEmployeesModel);
exports.getEmployees = factory.getOne(createEmployeesModel);

exports.deleteEmployees = expressAsyncHandler(async (req, res, next) => {
  const deleteDoc = await createEmployeesModel.findByIdAndDelete(req.params.id);
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

exports.updateEmployees = factory.updateOne(createEmployeesModel);
// exports.getNotifications = expressAsyncHandler(async (req, res, next) => {
//   const user = req.user;

//   try {
//     const notifications = user.notifications || [];
//     res.status(200).json({ notifications });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في الحصول على التنبيهات." });
//   }
// });
