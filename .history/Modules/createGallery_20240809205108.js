const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    Area: {
      type: Number,
    },

    price: {
      type: Number,
    },
    rooms: {
      type: Number,
    },
    maid: {
      type: String,
    },
    elevator: {
      type: Boolean,
      default: false,
    },
  
    phone: {
      type: Number,
      required: [true, "Required Phone User"],
      unique: [true, "Phone Must Be Unique"],
    },

    status: {
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
    kind: {
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

const createGallerysModel = mongoose.model("Gallerys", createGallery);
module.exports = createGallerysModel;
