const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    area: {
      type: Number,
    },
    price: {
      type: Number,
    },
    rooms: {
      type: Number,
    },
    hall: {
      type: Number,
    },
    kitchen: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    balcony: {
      type: Number,
    },
    maid: {
      type: Boolean,
      default: false,
    },
    elevator: {
      type: Boolean,
      default: false,
    },
    kind: {
      type: String,
      enum: ["villa 200-395", "villa 300-450", "apartment"],
      default: "apartment",
    },
    status: {
      type: String,
      enum: ["sold", "available", "pawned"],
      default: "pawned",
    },
    images: [
      {
        image: String,
      },
    ],
  },
  { timestamps: true }
);

const ImageURL = (doc) => {
  if (doc.images) {
    doc.images = {image}
  }
};

createGallery.post("init", (doc) => {
  ImageURL(doc);
});

createGallery.post("save", (doc) => {
  ImageURL(doc);
});

const createGallerysModel = mongoose.model("Gallerys", createGallery);

module.exports = createGallerysModel;
