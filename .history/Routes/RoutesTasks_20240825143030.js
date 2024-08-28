const express = require("express");
const Routes = express.Router();
const {
  createTask,
  completeTask,
  reviewTask,
  getAllTasksForManager,
  getTasksForSupervisor,
  getTasksForAccountant,
} = require("../Services/TasksService");


// توزيع مهمة
Routes.route("/assignTask").post( createTask);
Routes.route("/complete/:taskId").post( completeTask);

// إكمال مهمة من قبل الشخص المكلف
// router.post("/complete/:taskId", completeTask);

// مراجعة مهمة من قبل الشخص الذي أسند المهمة
router.post("/review", reviewTask);

// عرض جميع المهام للمدير
router.get("/manager-tasks", getAllTasksForManager);

// عرض المهام للمشرف
router.get("/supervisor-tasks", getTasksForSupervisor);

// عرض المهام للمحاسب
router.get("/accountant-tasks", getTasksForAccountant);

module.exports = router;
