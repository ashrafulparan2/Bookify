const Wishlist = require("./wishlist.model");

const addToWishlist = async (req, res) => {
  try {
    const { email, productIds } = req.body;
    const newWishlist = await Wishlist.findOneAndUpdate(
      { email },
      { $addToSet: { productIds: { $each: productIds } } },
      { new: true, upsert: true } // Create a new document if none exists
    );
    res.status(200).json(newWishlist);
  } catch (error) {
    console.error("Error adding to wishlist", error);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { email, productId } = req.body;
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { email },
      { $pull: { productIds: productId } },
      { new: true }
    );
    if (!updatedWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(updatedWishlist);
  } catch (error) {
    console.error("Error removing from wishlist", error);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { email } = req.params;
    const wishlist = await Wishlist.findOne({ email });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist", error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
