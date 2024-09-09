const expressAsyncHandler = require("express-async-handler");
const createEmployeesModel = require("../Modules/createEmployees");
const TaskModel = require("../Modules/createTasks");
const factory = require("./FactoryHandler");
exports.createTask = async (req, res) => {
  const { taskName, taskDuration, taskNotes, assignedTo, status, images } =
    req.body;
  const assignedBy = req.user._id; // الشخص الذي ينشئ المهمة (المدير، المشرف، إلخ.)

  try {
    const task = new TaskModel({
      taskName,
      taskDuration,
      taskNotes,
      assignedTo,
      assignedBy,
      status,
      images,
    });
    await task.save();

    // جلب بيانات المهمة بعد الحفظ مع الحقل المرجعي assignedBy
    const populatedTask = await TaskModel.findById(task._id).populate({
      path: "assignedBy",
    });
    const user = await createEmployeesModel.findById(assignedTo);
    if (user) {
      user.notifications.push({
        assignedBy: populatedTask.assignedBy.name,
        task: task._id, // هنا يتم إضافة معلومات الشخص الذي قام بتعيين المهمة
      });

      await user.save();
    }
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء المهمة." });
  }
};

exports.getTasks = factory.getAll(TaskModel);
exports.getOneTask = factory.getOne(TaskModel);
exports.getLoggedTask = factory.getLoggedTask(TaskModel);
exports.getLoggedTaskAssignedTo = factory.getLoggedTaskassignedTo(TaskModel);
exports.deleteSpecificNotification = expressAsyncHandler(
  async (req, res, next) => {
    try {
      // العثور على المستخدم وتنبيه معين دون حذفه
      const user = await createEmployeesModel.findOne({
        _id: req.user._id,
        "notifications._id": req.params.id,
      });

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "لم يتم العثور على التنبيه.",
        });
      }

      // العثور على التنبيه المحدد للحصول على معلومات المهمة
      const notification = user.notifications.id(req.params.id);
      const taskId = notification.task; // استخراج معرّف المهمة المرتبطة

      // تحديث المهمة بناءً على الإشعار قبل الحذف
      await TaskModel.findOneAndUpdate(
        { _id: taskId },
        { show: "تم عرض المهمة " },
        { new: true }
      );

      // بعد تحديث المهمة، قم بحذف التنبيه
      const updatedUser = await createEmployeesModel.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { notifications: { _id: req.params.id } } }, // إزالة التنبيه المحدد باستخدام $pull
        { new: true } // إرجاع النسخة المحدثة من المستند
      );

      res.status(200).json({
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      next(error); // تمرير الخطأ إلى middleware الخاص بالخطأ
    }
  }
);

exports.updateTask = factory.updateOne(TaskModel, "tasks");
exports.completeTask = expressAsyncHandler(()=>{
  
})
// async (req, res) => {
  
  // const { taskId } = req.params;
  // const user = req.user;

  // try {
  //   const task = await TaskModel.findById(taskId);
  //   if (!task) {
  //     return res.status(404).json({ message: "المهمة غير موجودة" });
  //   }

  //   if (user._id.toString() !== task.assignedTo.toString()) {
  //     return res
  //       .status(403)
  //       .json({ message: "فقط الشخص المكلف بالمهمة يمكنه إكمالها." });
  //   }

  //   task.status = "review";
  //   task.completionDate = new Date();
  //   task.reviewBy = task.assignedBy; // تعيين الشخص الذي سيراجع المهمة

  //   await task.save();
  //   res.status(200).json({ message: "تم إرسال المهمة للمراجعة." });
  // } catch (error) {
  //   res.status(500).json({ message: "خطأ في إكمال المهمة." });
  // }
// };
// exports.reviewTask = async (req, res) => {
//   const { taskId, approved } = req.body; // approved: true or false
//   const user = req.user;

//   try {
//     const task = await TaskModel.findById(taskId)
//       .populate("assignedBy")
//       .populate("assignedTo");
//     if (!task) {
//       return res.status(404).json({ message: "المهمة غير موجودة" });
//     }

//     if (user._id.toString() !== task.assignedBy.toString()) {
//       return res
//         .status(403)
//         .json({ message: "فقط الشخص الذي أسند المهمة يمكنه مراجعتها." });
//     }

//     if (approved) {
//       task.status = "completed";
//     } else {
//       task.status = "reassigned";
//       task.reassignedTo = task.assignedTo; // إعادة المهمة إلى الشخص الذي نفذها
//     }

//     await task.save();
//     res.status(200).json({ message: "تمت مراجعة المهمة بنجاح." });
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في مراجعة المهمة." });
//   }
// };
// exports.getAllMyTask = async (req, res) => {
//   const user = req.user;

//   try {
//     if (user.role !== "manager") {
//       return res
//         .status(403)
//         .json({ message: "فقط المدير يمكنه عرض جميع المهام." });
//     }

//     const tasks = await TaskModel.find({
//       $or: [{ assignedBy: user._id }, { assignedTo: { $in: [user._id] } }],
//     })
//       .populate("assignedBy")
//       .populate("assignedTo");

//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "خطأ في عرض المهام." });
//   }
// };
