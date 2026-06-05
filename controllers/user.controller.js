const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { ValidateRegister, ValidateLogin } = require("../validation/user.validation");

exports.register = async (req, res) => {
  const { error } = ValidateRegister(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, surname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "Email band" });
    const user = await User.create({ name, surname, email, password });
    const userResponse = user.toJSON();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { error } = ValidateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Parol xato" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });
    res.status(200).json({ token, user: { id: user.id, name: user.name, surname: user.surname, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] }, include: ["carts", "likes"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] }, include: ["carts", "likes"] });
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Topilmadi" });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
