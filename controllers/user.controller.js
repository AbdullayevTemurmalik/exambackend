const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Cart, Like } = require("../models");
const { ValidateRegister, ValidateLogin, ValidateUserUpdate } = require("../validation/user.validation");

// --------- POST USER REGISTER --------
exports.register = async (req, res) => {
  const { error } = ValidateRegister(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { userName, firstName, lastName, gender, age, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { userName }] } });
    if (existingUser) return res.status(409).json({ message: "Username yoki Email band" });
    const user = await User.create({ userName, firstName, lastName, gender, age, email, password });
    const userResponse = user.toJSON();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- POST USER LOGIN --------
exports.login = async (req, res) => {
  const { error } = ValidateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Parol xato" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });
    res.status(200).json({ token, user: { id: user.id, userName: user.userName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] }, include: ["carts", "likes"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] }, include: ["carts", "likes"] });
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { error } = ValidateUserUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    await user.update(req.body);
    const updated = user.toJSON();
    delete updated.password;
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.findAll({
      where: { [Op.or]: [{ userName: { [Op.iLike]: `%${query}%` } }, { email: { [Op.iLike]: `%${query}%` } }] },
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
