const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST new product with multiple images
exports.createProduct = async (req, res) => {
  try {
    const { title, description, rating, category, price, images } = req.body;

    if (!images || !Array.isArray(images) || images.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 image URLs are required." });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: "Valid price is required." });
    }

    const product = await Product.create({
      title,
      description,
      rating,
      category,
      price,       // ✅ New field saved
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
