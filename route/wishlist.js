const express = require("express");
const wishlistController = require("../controller/wishlist");

const router = express.Router();

router.get("/wishlists", wishlistController.all_Wishlist);

router.get("/wishlistById/:uniqueId", wishlistController.wishlist_UniqueId);

router.post("/insertWishlist", wishlistController.post_Wishlist);

router.delete("/deleteWishlist/:Id", wishlistController.delete_Wishlist);

module.exports = router;