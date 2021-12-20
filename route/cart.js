const express = require("express");
const cartController = require("../controller/cart");

const router = express.Router();

router.get("/carts", cartController.all_Cart);

router.get("/cartById/:uniqueId", cartController.cart_UniqueId);

router.post("/insertCart", cartController.post_Cart);

router.put("/updateCart", cartController.update_Cart)

router.delete("/deleteCartofUser/:Id", cartController.delete_CartByUser);
router.delete("/deleteCart/:Id", cartController.delete_Cart);

module.exports = router;