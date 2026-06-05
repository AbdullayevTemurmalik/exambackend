const { Like } = require("../models");
const { ValidateLike } = require("../validation/like.validation");

exports.createLike = async (req, res) => {
  const { error } = ValidateLike(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const like = await Like.create(req.body);
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({ include: ["user", "card"] });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.getLikeById = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id, { include: ["user", "card"] });
    if (!like) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.updateLike = async (req, res) => {
  const { error } = ValidateLike(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) return res.status(404).json({ message: "Topilmadi" });
    await like.update(req.body);
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) return res.status(404).json({ message: "Topilmadi" });
    await like.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};
