const express = require("express");
const Routes = express.Router();
const {
  createTask,
  getTasks,
  getLoggedTask,
  getLoggedTaskAssignedTo,
  deleteSpecificNotifcation,
  updateTask,
  getOneTask,
} = require("../Services/TasksService");
const { protect, getLoggedUserData } = require("../Services/AuthService");
const { UploadImageService, resizeImage } = require("../Utils/imagesHandler");

Routes.use(protect);
// توزيع مهمة
Routes.route("/assignTask").post(UploadImageService, resizeImage("gallery"),,createTask).get(getTasks);
// Routes.route("/assignTask/:id").get(getOneTask);
// Routes.route("/complete/:taskId").post(completeTask);
// Routes.route("/review").post(reviewTask);
Routes.get("/all-task", getLoggedUserData, getLoggedTask);
Routes.get("/myTaskAssignedTo", getLoggedUserData, getLoggedTaskAssignedTo);
Routes.put("/:id", updateTask);
Routes.get("/:id", getOneTask);

module.exports = Routes;
