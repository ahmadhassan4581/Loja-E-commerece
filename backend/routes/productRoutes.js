const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct); // new delete route

module.exports = router;
