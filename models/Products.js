const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ["kg", "dona", "qadoq", "m2"],
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("Product", ProductsSchema);

module.exports = Product;
