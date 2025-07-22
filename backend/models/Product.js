const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  price: { type: Number, required: true }, // ✅ New field
  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, "Exactly 4 images are required."],
  },
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model("Product", productSchema);
