const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("./wishlist.controller");

const router = express.Router();

// Add to wishlist
router.post("/add", addToWishlist);

// Remove from wishlist
router.post("/remove", removeFromWishlist);

// Get wishlist by user email
router.get("/:email", getWishlist);

module.exports = router;
