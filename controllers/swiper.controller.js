const { Swiper } = require("../models");
const { ValidateSwiper } = require("../validation/swiper.validation");

exports.createSwiper = async (req, res) => {
  const { error } = ValidateSwiper(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const swiper = await Swiper.create(req.body);
    res.status(201).json(swiper);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getSwipers = async (req, res) => {
  try {
    const swipers = await Swiper.findAll();
    res.status(200).json(swipers);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getSwiperById = async (req, res) => {
  try {
    const swiper = await Swiper.findByPk(req.params.id);
    if (!swiper) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(swiper);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateSwiper = async (req, res) => {
  const { error } = ValidateSwiper(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const swiper = await Swiper.findByPk(req.params.id);
    if (!swiper) return res.status(404).json({ message: "Topilmadi" });
    await swiper.update(req.body);
    res.status(200).json(swiper);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteSwiper = async (req, res) => {
  try {
    const swiper = await Swiper.findByPk(req.params.id);
    if (!swiper) return res.status(404).json({ message: "Topilmadi" });
    await swiper.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
