const { Router } = require("express");
const router = Router();
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Yangiliklarni boshqarish
 */

/**
 * @swagger
 * /news/createNews:
 *   post:
 *     summary: Yangi yangilik yaratish
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url: { type: string, example: "https://example.com/news.png" }
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: Xato ma'lumot }
 */
router.post("/createNews", createNews);

/**
 * @swagger
 * /news/getNews:
 *   get:
 *     summary: Barcha yangiliklarni olish
 *     tags: [News]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getNews", getNews);

/**
 * @swagger
 * /news/getNews/{id}:
 *   get:
 *     summary: ID bo'yicha yangilik olish
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Topildi }
 *       404: { description: Topilmadi }
 */
router.get("/getNews/:id", getNewsById);

/**
 * @swagger
 * /news/updateNews/{id}:
 *   put:
 *     summary: Yangilikni yangilash
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url: { type: string, example: "https://example.com/newnews.png" }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateNews/:id", updateNews);

/**
 * @swagger
 * /news/deleteNews/{id}:
 *   delete:
 *     summary: Yangilikni o'chirish
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/deleteNews/:id", deleteNews);

module.exports = router;
