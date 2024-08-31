const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    name: {
      required: [true, "Name Is Required"],
      type: String,
    },

    r: {
      type: String,
    },
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
