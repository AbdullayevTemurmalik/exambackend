const { Cart } = require("../models");
const { ValidateCart } = require("../validation/cart.validation");

exports.createCart = async (req, res) => {
  const { error } = ValidateCart(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({ include: ["user", "card"] });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id, { include: ["user", "card"] });
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { error } = ValidateCart(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    await cart.update(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    await cart.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
