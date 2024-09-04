const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    identity: String,

    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
    phone: String,

    marketers: [re],
  },
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
