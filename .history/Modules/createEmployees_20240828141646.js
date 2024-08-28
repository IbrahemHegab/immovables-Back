const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    name: {
      required: [true, "Name Is Required"],
      type: String,
    },
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["manager", "accountant", "supervisor", "marketer"],
      default: "marketer",
    },
    notifications: [{ taskName: String }],
  },
  { timestamps: true }
);
createEmployees.pre(/^find/, function (next) {
  this.populate({
    path: "notifications.lacture",
  });
  next();
});
const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
