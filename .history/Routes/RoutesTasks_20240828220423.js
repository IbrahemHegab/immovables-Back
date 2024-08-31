const express = require("express");
const Routes = express.Router();
const {
  createTask,
  getTasks,
  getOneTask,
  completeTask,
  reviewTask,
  getLoggedTask,
  getLoggedTaskAssignedTo,

} = require("../Services/TasksService");
const { protect, getLoggedUserData } = require("../Services/AuthService");

Routes.use(protect);
// توزيع مهمة
Routes.route("/assignTask").post(createTask).get(getTasks);
// Routes.route("/assignTask/:id").get(getOneTask);
// Routes.route("/complete/:taskId").post(completeTask);
// Routes.route("/review").post(reviewTask);
Routes.get("/my-task", getLoggedUserData, getLoggedTask);
Routes.get("/myTaskAssignedTo", getLoggedUserData, getLoggedTaskAssignedTo);


module.exports = Routes;
