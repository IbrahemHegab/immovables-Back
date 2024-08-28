const createEmployeesModel = require("../Modules/createEmployees");
const TaskModel = require("../Modules/createTasks");
const factory = require("./FactoryHandler");
exports.createTask = async (req, res) => {
  const { taskName, taskDuration, taskType, taskNotes, assignedTo } = req.body;
  const assignedBy = req.user._id; // الشخص الذي ينشئ المهمة (المدير، المشرف، إلخ.)

  try {
    const task = new TaskModel({
      taskName,
      taskDuration,
      taskType,
      taskNotes,
      //   taskImage,
      assignedTo,
      assignedBy,
    });
    await task.save();
    const user = await createEmployeesModel.findById(assignedTo);
    if (user) {
      user.notifications.push({
        taskName: {task.assignedBy`,
      });
      console.log(task);
      
      await user.save();
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء المهمة." });
  }
};
exports.getTasks = factory.getAll(TaskModel);
exports.getOneTask = factory.getOne(TaskModel);
exports.getLoggedTask = factory.getLoggedTask(TaskModel);
exports.getLoggedTaskAssignedTo = factory.getLoggedTaskassignedTo(TaskModel);
exports.completeTask = async (req, res) => {
  const { taskId } = req.params;
  const user = req.user;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "المهمة غير موجودة" });
    }

    if (user._id.toString() !== task.assignedTo.toString()) {
      return res
        .status(403)
        .json({ message: "فقط الشخص المكلف بالمهمة يمكنه إكمالها." });
    }

    task.status = "review";
    task.completionDate = new Date();
    task.reviewBy = task.assignedBy; // تعيين الشخص الذي سيراجع المهمة

    await task.save();
    res.status(200).json({ message: "تم إرسال المهمة للمراجعة." });
  } catch (error) {
    res.status(500).json({ message: "خطأ في إكمال المهمة." });
  }
};
exports.reviewTask = async (req, res) => {
  const { taskId, approved } = req.body; // approved: true or false
  const user = req.user;

  try {
    const task = await TaskModel.findById(taskId)
      .populate("assignedBy")
      .populate("assignedTo");
    if (!task) {
      return res.status(404).json({ message: "المهمة غير موجودة" });
    }

    if (user._id.toString() !== task.assignedBy.toString()) {
      return res
        .status(403)
        .json({ message: "فقط الشخص الذي أسند المهمة يمكنه مراجعتها." });
    }

    if (approved) {
      task.status = "completed";
    } else {
      task.status = "reassigned";
      task.reassignedTo = task.assignedTo; // إعادة المهمة إلى الشخص الذي نفذها
    }

    await task.save();
    res.status(200).json({ message: "تمت مراجعة المهمة بنجاح." });
  } catch (error) {
    res.status(500).json({ message: "خطأ في مراجعة المهمة." });
  }
};
exports.getAllMyTask = async (req, res) => {
  const user = req.user;

  try {
    if (user.role !== "manager") {
      return res
        .status(403)
        .json({ message: "فقط المدير يمكنه عرض جميع المهام." });
    }

    const tasks = await TaskModel.find({
      $or: [{ assignedBy: user._id }, { assignedTo: { $in: [user._id] } }],
    })
      .populate("assignedBy")
      .populate("assignedTo");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "خطأ في عرض المهام." });
  }
};
