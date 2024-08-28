const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    name: {
      required: [true, "Name Is Required"],
      type: String,
    },

    role: {
      type: String,
      enum: ["manager", "supervisior", "manager"],
      default: "user",
    },
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
