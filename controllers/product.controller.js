const { Card } = require("../models");
const { ValidateProduct } = require("../validation/product.validation");

exports.createProduct = async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const product = await Card.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Card.findAll({ include: ["category"] });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Card.findByPk(req.params.id, { include: ["category"] });
    if (!product) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const product = await Card.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Topilmadi" });
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Card.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Topilmadi" });
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
