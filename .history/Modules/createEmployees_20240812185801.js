const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    id: {
      type: String,
    },

    name: {
      type: String,
    },

    jobTitl: {
      type: String,
      enum: ["first", "second", "third"],
      default: "first",
    },
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
