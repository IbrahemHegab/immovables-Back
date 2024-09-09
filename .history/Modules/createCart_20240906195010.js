const mongoose = require("mongoose");

const createCartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        gallery: {
          type: mongoose.Schema.ObjectId,
          ref: "Gallerys",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      require: [true, "User Id is Required"],
    },
  },
  { timestamps: true }
);

createCartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name phone',
  }).populate({
    path: 'cartItems.gallery',
    select: 'title image ',
  });
  next();
});
const createCartModel = mongoose.model("Cart", createCartSchema);
module.exports = createCartModel;
