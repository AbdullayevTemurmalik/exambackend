const { OrderItem, Product } = require("../models");
const { ValidateOrderItem, ValidateOrderItemUpdate } = require("../validation/orderItem.validation");

// --------- POST ORDERITEM --------
exports.addOrderItem = async (req, res) => {
  const { error } = ValidateOrderItem(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const item = await OrderItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll({ include: ["product", "order"] });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- GET ORDERITEMS BY ORDER --------
exports.getOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await OrderItem.findAll({ where: { order_id: req.params.orderId }, include: ["product"] });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, { include: ["product", "order"] });
    if (!item) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  const { error } = ValidateOrderItemUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Topilmadi" });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Topilmadi" });
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
