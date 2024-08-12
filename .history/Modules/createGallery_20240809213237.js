const mongoose = require("mongoose");

const createGallery = new mongoose.Schema(
  {
    area: {
      type: Number,
    }, //المساحه

    price: {
      type: Number,
    }, //السعر
    rooms: {
      type: Number,
    }, //الغرف
    hall: {
      type: Number,
    }, //الصاله
    kitchen: {
      type: Number,
    }, //الصاله
    bathrooms: {
      type: Number,
    }, //دورات المياه
    balcony: {
      type: Number,
    }, //البلكونه
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
      enum: ["villa 200-395", "villa 300-450", "apartment"],
      default: "apartment",
    }, //الحاله
    status: {
      type: String,
      enum: ["sold", "available", "pawned"],
      default: "pawned",
    }, //النوع
    images: [
      {
        image: String,
      },
    ],
    //الصور
  },
  { timestamps: true }
);
const ImageURL = (doc) => {
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((ele) => {
    
      console.log(ele.image);
      
      const imageURL = `${process.env.BASE_URL}/gallery/${ele.image}`;
      imagesList.push({imageURL});
    });
    log
    doc.images = imagesList;
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
