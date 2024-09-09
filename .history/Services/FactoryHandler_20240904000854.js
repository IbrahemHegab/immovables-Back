const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ApiError = require("../Resuble/ApiErrors");
const FeatureApi = require("../Utils/Feature");
const path = require("path");

const { fsRemove } = require("../Utils/imagesHandler");

exports.createOne = (Model) =>
  expressAsyncHandler(async (req, res) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    if (req.body.passwordDB) {
      req.body.passwordDB = await bcrypt.hash(req.body.passwordDB, 12);
    }
    const createDoc = await Model.create(req.body);
    res.status(201).json({ data: createDoc });
  });
exports.getAll = (Model, keyword) =>
  expressAsyncHandler(async (req, res) => {
    let fillter = {};
    if (req.filterObject) {
      fillter = req.filterObject;
    }

    const countDocs = await Model.countDocuments();
    const ApiFeatures = new FeatureApi(Model.find(fillter), req.query)
      .Fillter(Model)
      .Sort()
      .Fields()
      .Search(keyword)
      .Paginate(countDocs);
    const { MongooseQueryApi, PaginateResult } = ApiFeatures;
    const getDoc = await MongooseQueryApi;
    res
      .status(201)
      .json({ results: getDoc.length, PaginateResult, data: getDoc });
  });
exports.getOne = (Model, populateOpt) =>
  expressAsyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOpt) {
      query = query.populate(populateOpt);
    }
    const getDocById = await query;
    if (!getDocById)
      next(
        new ApiError(`Sorry Can't get This ID From ID :${req.params.id}`, 404)
      );
    res.status(200).json({ data: getDocById });
  });
exports.getLoggedTask = (Model, populateOpt) =>
  expressAsyncHandler(async (req, res, next) => {
    let query;

    // التحقق من دور المستخدم وإنشاء الاستعلام المناسب
    if (req.user.role === "manager") {
      // إذا كان المستخدم مديرًا، يجلب كل المهام
      query = Model.find();
    } else {
      // إذا لم يكن المستخدم مديرًا، يجلب المهام المخصصة له أو التي قام بتعيينها
      query = Model.find({
        $or: [{ assignedBy: req.user._id }, { assignedTo: req.user._id }],
      });
    }

    // إذا كانت هناك خيارات "populate"، يتم إضافتها للاستعلام
    if (populateOpt) {
      query = query.populate(populateOpt);
    }

    // تنفيذ الاستعلام
    const getDocById = await query;

    // إذا لم يتم العثور على مستندات، إرسال خطأ

    // إرسال النتائج
    res.status(200).json({ data: getDocById });
  });

exports.getLoggedTaskassignedTo = (Model, populateOpt) =>
  expressAsyncHandler(async (req, res, next) => {
    let query = Model.find({ assignedTo: req.user._id });
    if (populateOpt) {
      query = query.populate(populateOpt);
    }
    const getDocById = await query;

    res.status(200).json({ data: getDocById });
  });

exports.deleteOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const deleteDoc = await Model.findByIdAndDelete(req.params.id);
    const baseUrl = `${process.env.BASE_URL}/teacher/`;

    if (!deleteDoc) {
      return next(
        new ApiError(`Sorry Can't Delete This ID :${req.params.id}`, 404)
      );
    }
    if (deleteDoc.image) {
      const relativePathimage = deleteDoc.image.replace(baseUrl, "");
      const filePathImage = path.join(
        __dirname,
        "../uploads/teacher",
        relativePathimage
      );
      fsRemove(filePathImage);
    }
    if (deleteDoc.picture) {
      const relativePathPicture = deleteDoc.picture.replace(baseUrl, "");
      const filePathPicture = path.join(
        __dirname,
        "../uploads/teacher",
        relativePathPicture
      );
      fsRemove(filePathPicture);
    }
    if (deleteDoc.avater) {
      const relativePathAvatar = deleteDoc.avater.replace(baseUrl, "");
      const filePathAvater = path.join(
        __dirname,
        "../uploads/teacher",
        relativePathAvatar
      );
      fsRemove(filePathAvater);
    }
    res.status(200).json({ message: "Delete Success", data: deleteDoc });
  });
  exports.updateOne = (Model, filePath) =>
    expressAsyncHandler(async (req, res, next) => {
      const baseUrl = `${process.env.BASE_URL}/${filePath}/`;
      try {
        const findDocument = await Model.findById(req.params.id);
        if (!findDocument) {
          return next(
            new ApiError(
              `عذرًا، لا يمكن العثور على المستند بالمعرف: ${req.params.id}`,
              404
            )
          );
        }
  
        // حذف الصور القديمة في حال تم تحديثها
        for (const key of Object.keys(req.body.images)) {
          if (req.body.images[key] !== undefined) {
            if (findDocument[key] && findDocument[key] !== req.body.images[key]) {
              const relativePathImage = findDocument[key].split(baseUrl)[1];
              filePathImage(filePath, relativePathImage); // حذف الصورة القديمة
            }
          }
        }
  
        // إعداد بيانات التحديث
        const updateData = { ...req.body };
        for (const key of Object.keys(req.body.images)) {
          if (req.body.images[key] !== undefined) {
            updateData[key] = req.body.images[key];
          }
        }
  console.log(updateData);
  
        // تحديث المستند
        const updateDocById = await Model.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );
        if (!updateDocById) {
          return next(
            new ApiError(
              `عذرًا، لا يمكن تحديث المستند بالمعرف: ${req.params.id}`,
              404
            )
          );
        }
        
        await updateDocById.save();
        res.status(200).json({ data: updateDocById });
      } catch (error) {
        next(error);
      }
    });
  