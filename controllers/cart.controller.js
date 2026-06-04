const { Cart, Product, User } = require("../models");
const { ValidateCart, ValidateCartUpdate } = require("../validation/cart.validation");

// --------- POST CART --------
exports.addToCart = async (req, res) => {
  const { error } = ValidateCart(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const { user_id, product_id, quantity } = req.body;
    let cartItem = await Cart.findOne({ where: { user_id, product_id } });
    if (cartItem) {
      cartItem.quantity += (quantity || 1);
      await cartItem.save();
      return res.status(200).json(cartItem);
    } else {
      const cart = await Cart.create(req.body);
      return res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({ include: ["user", "product"] });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- GET CARTS BY USER --------
exports.getCartByUserId = async (req, res) => {
  try {
    const carts = await Cart.findAll({ where: { user_id: req.params.userId }, include: ["product"] });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id, { include: ["user", "product"] });
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { error } = ValidateCartUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    await cart.update(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- DELETE CART --------
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Topilmadi" });
    await cart.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
