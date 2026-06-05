const { News } = require("../models");
const { ValidateNews } = require("../validation/news.validation");

exports.createNews = async (req, res) => {
  const { error } = ValidateNews(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: "Topilmadi" });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.updateNews = async (req, res) => {
  const { error } = ValidateNews(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: "Topilmadi" });
    await news.update(req.body);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: "Topilmadi" });
    await news.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
