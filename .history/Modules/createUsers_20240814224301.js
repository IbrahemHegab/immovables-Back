const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
  
    identity: {
      type: String,
    },
    name: {
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

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
