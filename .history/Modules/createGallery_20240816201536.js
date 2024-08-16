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
    street: {
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
    driver: {
      type: Boolean,
      default: false,
    },
    warehouse: {
      type: Boolean,
      default: false,
    },
    kind: {
      type: String,
      enum: ["villa-200-295", "villa-300-450", "apartment"],
      default: "apartment",
    },
   
    status: {
      type: String,
      enum: ["sold", "available", "pawned"],
      default: "available",
    },
    images: [
      {
        image: String,
        // يمكنك إضافة حقول أخرى إذا كنت بحاجة إلى ذلك
      },
    ],
  },
  { timestamps: true }
);

const ImageURL = (doc) => {


  if (doc.images) {
    doc.images = doc.images.map((ele) => ({
      image: `${process.env.BASE_URL}/gallery/${ele.image}`,
      // يمكنك إضافة معلومات أخرى هنا إذا كنت بحاجة
    }));
  }
};
// const ImageURL = (doc) => {
//   if (doc.image && !doc.image.includes(`${process.env.BASE_URL}/gallery`)) {
//     const image = `${process.env.BASE_URL}/gallery/${doc.image}`;
//     doc.image = image;
//   }
// };
createGallery.post("init", (doc) => {
  ImageURL(doc);
});

createGallery.post("save", (doc) => {
  ImageURL(doc);
});

const createGallerysModel = mongoose.model("Gallerys", createGallery);

module.exports = createGallerysModel;
