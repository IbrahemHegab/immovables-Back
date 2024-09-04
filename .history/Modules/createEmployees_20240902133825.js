const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const createEmployees = new mongoose.Schema(
  {
    name: {
      required: [true, "Name Is Required"],
      type: String,
    },
    identity: String,
    username: String,
    password: String,
    phone: String,
    role: {
      type: String,
      enum: ["manager", "accountant", "supervisor", "marketer"],
      default: "marketer",
    },
    notifications: [{ assignedBy: String, task: String }],
  },
  { timestamps: true }
);
createEmployees.pre(/^find/, async function (next) {
  // فقط نقوم بتشفير كلمة المرور إذا تم تعديلها
  

  // تشفير كلمة المرور
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
