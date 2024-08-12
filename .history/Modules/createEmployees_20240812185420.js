const mongoose = require("mongoose");

const createEmployees= new mongoose.Schema(
  {
    id: {
      type: String,
    },

   
    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    marketers: [String],
  },
  { timestamps: true }
);

const createEmployeesModel = mongoose.model("Users", createEmployees);
module.exports = createEmployeesModel;
