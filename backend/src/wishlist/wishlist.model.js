const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    productIds: [
      {
        type: Number,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
