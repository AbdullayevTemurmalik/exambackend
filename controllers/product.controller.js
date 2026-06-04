const { Op } = require("sequelize");
const { Product, Category } = require("../models");
const { ValidateProduct, ValidateProductUpdate } = require("../validation/product.validation");

exports.createProduct = async (req, res) => {
  try {
    let data = { ...req.body };

    if (data.price) data.price = parseFloat(data.price);
    if (data.category_id && data.category_id !== "") {
      data.category_id = parseInt(data.category_id);
    } else {
      delete data.category_id;
    }

    const { error } = ValidateProduct(data);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const product = await Product.create(data);

    const fullProduct = await Product.findByPk(product.id, { include: ["category"] });

    res.status(201).json(fullProduct);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: ["category"] });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "So'rov yuborilmadi" });
    const products = await Product.findAll({
      where: { [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }, { description: { [Op.iLike]: `%${query}%` } }] },
      include: ["category"]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, category_id } = req.query;
    let where = {};
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }
    if (category_id) where.category_id = category_id;
    const products = await Product.findAll({ where, include: ["category"] });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: ["category"] });
    if (!product) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Topilmadi" });

    let updateData = { ...req.body };
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.category_id && updateData.category_id !== "") {
      updateData.category_id = parseInt(updateData.category_id);
    } else {
      updateData.category_id = null;
    }

    const { error } = ValidateProductUpdate(updateData);
    if (error) return res.status(400).json({ message: error.details[0].message });

    await product.update(updateData);
    const updated = await Product.findByPk(product.id, { include: ["category"] });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Topilmadi" });
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
