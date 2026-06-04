const { Like, Product, User } = require("../models");
const { ValidateLike } = require("../validation/like.validation");

// --------- POST LIKE --------
exports.addLike = async (req, res) => {
  const { error } = ValidateLike(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const like = await Like.create(req.body);
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({ include: ["user", "product"] });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- GET LIKES BY USER --------
exports.getLikesByUserId = async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { user_id: req.params.userId }, include: ["product"] });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getLikeById = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id, { include: ["user", "product"] });
    if (!like) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// --------- DELETE LIKE --------
exports.removeLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) return res.status(404).json({ message: "Topilmadi" });
    await like.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
