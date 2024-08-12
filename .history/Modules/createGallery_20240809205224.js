const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    Area: {
      type: Number,
    },//المساحه

    price: {
      type: Number,
    },//السعر
    rooms: {
      type: Number,
    },//الغرف
    maid: {
      type: Boolean,
      default: false,
    },//خادمة
    elevator: {
      type: Boolean,
      default: false,
    },//مصعد
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
