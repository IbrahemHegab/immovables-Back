const mongoose = require("mongoose");

const createEmployees= new mongoose.Schema(
  {
    id: {
      type: String,
    },

    identity: {
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

const createUsersModel = mongoose.model("Users", createEmployees);
module.exports = createUsersModel;
