const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    identity: {
      type: Number,
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
      enum: [
        "user",
        "manager",
        "admin",
        "bookkeeper",
        "supervisor",
        "caulescent",
      ],
      default: "user",
    },
  },
  { timestamps: true }
);

const createGallerysModel = mongoose.model("Users", createGallery);
module.exports = createUsersModel;
