const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    ID: {
      type: Number,
    },

    Identity: {
      type: آعةلاثق,
    },
    name: {
      type: String,
      required: [true, "Required E-mail User"],
      trim: true,
      unique: [true, "E-mail Must Be Unique"],
    },

    phone: {
      type: Number,
      required: [true, "Required Phone User"],
      unique: [true, "Phone Must Be Unique"],
    },

    role: {
      type: String,
      enum: ["user","manager", "admin", "bookkeeper", "supervisor", "caulescent"],
      default: "user",
    },


  },
  { timestamps: true }
);

createUsers.post("save", (doc) => {
  ImageURL(doc);
});
const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
