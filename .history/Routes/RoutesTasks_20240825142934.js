const express = require("express");
const router = express.Router();
const {
  createTask,
  completeTask,
  reviewTask,
  getAllTasksForManager,
  getTasksForSupervisor,
  getTasksForAccountant,
} = require("../Services/TasksService");

const Routes = express.Router();
// توزيع مهمة
router.post("/assignTask", createTask);

// إكمال مهمة من قبل الشخص المكلف
router.post("/complete/:taskId", completeTask);

// مراجعة مهمة من قبل الشخص الذي أسند المهمة
router.post("/review", reviewTask);

// عرض جميع المهام للمدير
router.get("/manager-tasks", getAllTasksForManager);

// عرض المهام للمشرف
router.get("/supervisor-tasks", getTasksForSupervisor);

// عرض المهام للمحاسب
router.get("/accountant-tasks", getTasksForAccountant);

module.exports = router;
