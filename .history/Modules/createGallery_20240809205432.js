const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    Area: {
      type: Number,
    }, //المساحه

    price: {
      type: Number,
    }, //السعر
    rooms: {
      type: Number,
    }, //الغرف
    maid: {
      type: Boolean,
      default: false,
    }, //خادمة
    elevator: {
      type: Boolean,
      default: false,
    }, //مصعد
    kind: {
      type: String,
      enum: [
        "villa",
        "manager",
        "admin",
        "bookkeeper",
        "supervisor",
        "caulescent",
      ],
      default: "user",
    }, //الحاله
    status: {
      type: String,
      enum: ["sold", "available", "pawned"],
      default: "pawned",
    }, //النوع
  },
  { timestamps: true }
);

const createGallerysModel = mongoose.model("Gallerys", createGallery);
module.exports = createGallerysModel;
