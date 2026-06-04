const { Category, Product } = require("../models");
const { ValidateCategory, ValidateCategoryUpdate } = require("../validation/category.validation");

exports.createCategory = async (req, res) => {
  const { error } = ValidateCategory(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: ["products"] });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: ["products"] });
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { error } = ValidateCategoryUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    await category.update(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Topilmadi" });
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
