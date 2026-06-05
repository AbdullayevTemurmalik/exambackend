const { Category } = require("../models");
const { ValidateCategory } = require("../validation/category.validation");

exports.createCategory = async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: ["cards"] });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: ["cards"] });
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    await category.update(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
