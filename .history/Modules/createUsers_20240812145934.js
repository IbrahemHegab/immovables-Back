const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
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

    marketers: { [],
    
  },  
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
