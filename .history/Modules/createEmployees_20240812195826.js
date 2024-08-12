const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    id: {
      type: String,
    },

    name: {
      required: [true , "Name Is "],
      type: String,
    },

    jobTitle: {
      type: String,
      enum: ["manager", "supervisor", "accountant", "marketer"],
      default: "marketer",
    },
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
