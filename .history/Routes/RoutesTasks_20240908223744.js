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
  completeTask,
  rejectedTask,
} = require("../Services/TasksService");
const { protect, getLoggedUserData } = require("../Services/AuthService");
const { UploadImageService, resizeImage } = require("../Utils/imagesHandler");

Routes.use(protect);
// توزيع مهمة
Routes.route("/assignTask")
  .post(UploadImageService, resizeImage("tasks"), createTask)
  .get(getTasks);
// Routes.route("/assignTask/:id").get(getOneTask);
Routes.route("/complete/:id").post(completeTask);
Routes.route("/rejected/:id").post(rejectedTask);
Routes.route("/rejected/:id").post(rejectedTask);
// Routes.route("/review").post(reviewTask);
Routes.get("/all-task", getLoggedUserData, getLoggedTask);
Routes.get("/myTaskAssignedTo", getLoggedUserData, getLoggedTaskAssignedTo);
Routes.put("/:id", updateTask);
Routes.get("/:id", getOneTask);

module.exports = Routes;
