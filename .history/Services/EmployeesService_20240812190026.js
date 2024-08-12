const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createEmployeesModel = require("../Modules/createEmployees");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const createEmployeesModel = require("../Modules/createEmployees");

exports.createEmployees = expressAsyncHandler(async (req, res) => {
  const user = await createEmployeesModel.create(req.body);
  const id = Math.floor(10000000 + Math.random() * 900000).toString();
  user.id = id;
  await user.save();
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getEmployees = factory.getAll(createEmployeesModel);
exports.getUser = factory.getOne(createEmployeesModel);

exports.deleteUser =expressAsyncHandler(async (req, res, next) => {
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


exports.updateUser = factory.updateOne(createEmployeesModel)
