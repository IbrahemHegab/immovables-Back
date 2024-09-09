const factory = require("./FactoryHandler");
const expressAsyncHandler = require("express-async-handler");

const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");



exports.deletePermission = expressAsyncHandler(async (req, res) => {
  // if (req.body.password) {
  //   req.body.password = await bcrypt.hash(req.body.password, 12);
  // }
  const user = await createUsersModel.create(req.body);
  await user.save();
  res.status(200).json({
    status: "success",
    data: user,
  });
});



exports.updateUser = factory.updateOne(createUsersModel);
