const Product = require("../models/Products");

// Add Product
exports.addProduct = async (req, res) => {
  const { code, name, imageUrl, qty, unit } = req.body;

  let errorMessage = "";

  if (!code || !name || !imageUrl || !qty || !unit) {
    errorMessage = "Please provide code, name, imageUrl, unit and qty";
  }

  if (errorMessage) {
    return res.status(400).send({ message: errorMessage });
  }

  try {
    const product = await Product.findOne({ code });

    if (!product) {
      const newProduct = new Product({
        code,
        name,
        imageUrl,
        qty,
        unit,
        adminId: req.adminId,
      });

      await newProduct.save();

      return res.status(201).send({
        message: "Product successfully created",
        data: newProduct,
      });
    } else {
      product.qty += qty;

      await product.save();

      return res.status(201).send({
        message: "Product successfully updated",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// get All Products
exports.getProducts = async (req, res) => {
  const adminId = req.adminId;

  try {
    const products = await Product.find({ adminId: adminId }).exec();

    if (products.length === 0 || !products) {
      return res.status(200).send({ message: "Products not Found" });
    }

    return res
      .status(200)
      .send({ message: "Found User Products", data: products });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Get product
exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).exec();

    if (!product) {
      return res.status(400).send({ message: "Product not Found" });
    }

    return res.status(200).send({ message: "Found Product", data: product });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// edit product
exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, qty, unit } = req.body;

  let errorMessage = "";

  if (!name || !imageUrl || !qty || !unit) {
    errorMessage = "Please provide name, imageUrl, unit and qty";
  }

  if (errorMessage) {
    return res.status(400).send({ message: errorMessage });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          imageUrl,
          qty,
          unit,
        },
      }
    ).exec();

    if (!product) {
      return res.status(400).send({ message: "Product not Found" });
    }

    return res.status(200).send({
      message: "Product successfully updated",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete({ _id: id }).exec();
    
    if (!product) {
      return res.status(400).send({ message: "Product not Found" });
    }

    return res.status(200).send({
      message: "Product successfully deleted",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
