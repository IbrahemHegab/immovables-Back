const express = require("express");
const Routes = express.Router();
const {
  createTask,
  getTasks,
  getOneTask,
  completeTask,
  reviewTask,
  getAllMyTask,
  getTasksForSupervisor,
  getTasksForAccountant,
  getTasksForMarketer,
} = require("../Services/TasksService");
const { protect, getLoggedUserData } = require("../Services/AuthService");

Routes.use(protect);
// توزيع مهمة
Routes.route("/assignTask").post(createTask).get(getTasks);
Routes.route("/assignTask/:id").get(getOneTask);
Routes.route("/complete/:taskId").post(completeTask);
Routes.route("/review").post(reviewTask);
Routes.get("/my-task", getLoggedUserData,);
// Routes.route("/my-task").get(getAllMyTask);
// Routes.route("/manager-tasks").get(getAllTasksForManager);
// Routes.route("/supervisor-tasks").get(getTasksForSupervisor);
// Routes.route("/accountant-tasks").get(getTasksForAccountant);
// Routes.route("/marketer-tasks").get(getTasksForMarketer);


module.exports = Routes;
