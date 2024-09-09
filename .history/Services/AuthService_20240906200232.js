const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const os = require("os");

const ApiError = require("../Resuble/ApiErrors");

const createUsersModel = require("../Modules/createUsers");
const createEmployeesModel = require("../Modules/createEmployees");
// exports.createFirstManegerAccount = async () => {
//   if (await createUsersModel.findOne({ name: "manager" })) return;
//   const admin = await createUsersModel.create({
//     name: "admin",
//     email: "admin@gmail.com",
//     phone: "01000000000",
//     identity: 1234569,
//     role: "admin",
//     password: await bcrypt.hash("123456789", 12),
//     confirmPassword: await bcrypt.hash("123456789", 12),
//   });

//   console.log("Admin account created successfully");
// };
exports.getLoggedUserData = expressAsyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});
exports.SingUp = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const user = await createEmployeesModel.create(req.body);

  try {
    const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
      expiresIn: "90d",
    });
    await user.save();
    res.status(200).json({
      status: "success",

      data: user,
      token,
    });
  } catch (error) {
    return next(new ApiError("Somthing failed"));
  }
  // try {
});

exports.Login = expressAsyncHandler(async (req, res, next) => {
  const user = await createUsersModel.findOne({
    username: req.body.username,
  });

  let employees = await createEmployeesModel.findOne({
    username: req.body.username,
  });
  if (!user || !(await (req.body.password, user.password))) {
    res.status(500).json({
      status: "Error",
      massage: "Incorrect password Or Name",
    });
  }

  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
    expiresIn: "90d",
  });

  res.status(200).json({ data: user, token });
});
exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          status: "Error",
          massage: "You are not allowed to access this route",
        })
      );
    }
    next();
  });
exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // استخراج التوكن من الهيدر
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // التحقق من وجود التوكن
  if (!token) {
    return res.status(401).json({
      statusCode: "Error",
      message: "Invalid token. Please login again.",
    });
  }

  // التحقق من صحة التوكن
  const decoded = jwt.verify(token, process.env.DB_URL);
  if (!decoded) {
    return res.status(401).json({
      statusCode: "Error",
      message: "Invalid token. Please login again.",
    });
  }

  // العثور على المستخدم بناءً على الـID المستخرج من التوكن
  const currentUser =
    (await createUsersModel.findById(decoded.userId)) ||
    (await createEmployeesModel.findById(decoded.userId));

  if (!currentUser) {
    return res.status(401).json({
      statusCode: "Error",
      message: "User or Employees not found.",
    });
  }

  // التحقق مما إذا قام المستخدم بتغيير كلمة المرور بعد إصدار التوكن
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // إذا تم تغيير كلمة المرور بعد إنشاء التوكن
    if (passChangedTimestamp > decoded.iat) {
      return res.status(401).json({
        statusCode: "Error",
        message: "User recently changed his password. Please login again.",
      });
    }
  }

  // تحديد الدور وتعيين النموذج المناسب
  if (
    currentUser.role === "manager" ||
    currentUser.role === "supervisor" ||
    currentUser.role === "accountant" ||
    currentUser.role === "marketer"
  ) {
    req.model = createEmployeesModel;
  } else if (currentUser.role === "user") {
    req.model = createUsersModel;
  } else {
    return res.status(403).json({
      statusCode: "Error",
      message:
        "Access denied. You do not have permission to perform this action.",
    });
  }

  req.user = currentUser;

  next();
});
exports.resendCodeVerify = expressAsyncHandler(async (req, res, next) => {
  const email = req.user.email;
  const user = await createUsersModel.findOne({ email: email });
  if (!user) {
    return next(new ApiError(`This Email ${email} Not Exist `));
  }
  const digitCode = Math.floor(100000 + Math.random() * 900000).toString();
  const ciphertext = crypto
    .createHash("sha256")
    .update(digitCode)
    .digest("hex");

  user.code = ciphertext;
  user.codeExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendCode(user.email, digitCode);
  res
    .status(200)
    .json({ status: "success", massage: "Rest Code Sent successfully" });
});
exports.forgetPassword = expressAsyncHandler(async (req, res, next) => {
  const user = await createUsersModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`This Email ${req.body.email} Not Exist `));
  }
  const digitCode = Math.floor(100000 + Math.random() * 900000).toString();
  const ciphertext = crypto
    .createHash("sha256")
    .update(digitCode)
    .digest("hex");

  user.code = ciphertext;
  user.codeExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendCode(user.email, digitCode);
  res
    .status(200)
    .json({ status: "success", massage: "Rest Code Sent successfully" });
});
exports.restCodeSent = expressAsyncHandler(async (req, res, next) => {
  const restcode = req.body.code.toString();
  const ciphertext = crypto.createHash("sha256").update(restcode).digest("hex");
  const user = await createUsersModel.findOne({
    code: ciphertext,
    codeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Rest Code is Invalid Or Expired"));
  }
  user.userVerify = true;
  await user.save();
  res.status(200).json({ status: "success" });
});
exports.restNewPassword = (UserPassword) =>
  expressAsyncHandler(async (req, res, next) => {
    const user = await createUsersModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
      );
    }

    // 2) Check if reset code verified
    if (!user.userVerify) {
      return next(new ApiError("Reset code not verified", 400));
    }
    if (UserPassword === "password") {
      user.password = await bcrypt.hash(req.body.setNewPassword, 12);
    }

    user.code = undefined;
    user.codeExpires = undefined;
    user.userVerify = true;

    await user.save();
    if (UserPassword === "password") {
      const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
        expiresIn: "90d",
      });
      res.status(200).json({ token });
    }
    res.status(200).json({ status: "success" });
  });
