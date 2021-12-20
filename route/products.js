const express = require("express");
const productController = require("../controller/products");

const router = express.Router();

router.get("/products", productController.all_Products);
router.post("/insertProduct", productController.post_Products);

module.exports = router;