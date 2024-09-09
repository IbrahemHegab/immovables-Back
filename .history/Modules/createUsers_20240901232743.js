const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    identity:
      type: String,
   ,
    name:
       String,
   ,
    password: String,
    role: {
      type: String,
      default: "user"
    },
    phone: 
      String,

    marketers: [String],
  },
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
