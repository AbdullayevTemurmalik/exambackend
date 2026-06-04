const { Order, OrderItem, Product, User } = require("../models");
const { ValidateOrder, ValidateOrderUpdate } = require("../validation/order.validation");

exports.createOrder = async (req, res) => {
  const { error } = ValidateOrder(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: ["user", "orderItems"] });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- GET ORDERS BY USER --------
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.params.userId },
      include: [{ model: OrderItem, as: "orderItems", include: ["product"] }]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ["user", { model: OrderItem, as: "orderItems", include: ["product"] }]
    });
    if (!order) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { error } = ValidateOrderUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Topilmadi" });
    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Topilmadi" });
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
