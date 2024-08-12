const mongoose = require("mongoose");

const createEmployees = new mongoose.Schema(
  {
    id: {
      type: String,
    },

    name: {
      required: [true, "Name Is Required"],
      type: String,
    },

    jobTitle: [{ 
      
    }],
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Employees", createEmployees);
module.exports = createEmployeesModel;
