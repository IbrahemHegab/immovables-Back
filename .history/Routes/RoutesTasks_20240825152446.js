const express = require("express");
const Routes = express.Router();
const {
  createTask,
  getTasks,
  completeTask,
  reviewTask,
  getAllTasksForManager,
  getTasksForSupervisor,
  getTasksForAccountant,
  getTasksForMarketer,
} = require("../Services/TasksService");
const { protect } = require("../Services/AuthService");

Routes.use(protect);
// توزيع مهمة
Routes.route("/assignTask").post(createTask).get(getTasks);
Routes.route("/complete/:taskId").post(completeTask);
Routes.route("/review").post(reviewTask);
Routes.route("/manager-tasks").get(getAllTasksForManager);
Routes.route("/supervisor-tasks").get(getTasksForSupervisor);
Routes.route("/accountant-tasks").get(getTasksForAccountant);
Routes.route("/marketer-tasks").get(getTasksForMarketer);


module.exports = Routes;
