const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    name: {
      required: [true, "Name Is Required"],
      type: String,
    },
username:String,
password:String,
    role: {
      type: String,
      enum: ["manager", "supervisor", "accountant", "marketer"],
      default: "marketer",
    },
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
