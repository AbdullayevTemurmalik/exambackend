const { Router } = require("express");
const router = Router();
const {
  createSwiper,
  getSwipers,
  getSwiperById,
  updateSwiper,
  deleteSwiper,
} = require("../controllers/swiper.controller");

/**
 * @swagger
 * tags:
 *   name: Swipers
 *   description: Swiper (karusel) rasmlarini boshqarish
 */

/**
 * @swagger
 * /swiper/createSwiper:
 *   post:
 *     summary: Yangi swiper yaratish
 *     tags: [Swipers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url: { type: string, example: "https://example.com/image.png" }
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: Xato ma'lumot }
 */
router.post("/createSwiper", createSwiper);

/**
 * @swagger
 * /swiper/getSwipers:
 *   get:
 *     summary: Barcha swiperlarni olish
 *     tags: [Swipers]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getSwipers", getSwipers);

/**
 * @swagger
 * /swiper/getSwiper/{id}:
 *   get:
 *     summary: ID bo'yicha swiper olish
 *     tags: [Swipers]
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
router.get("/getSwiper/:id", getSwiperById);

/**
 * @swagger
 * /swiper/updateSwiper/{id}:
 *   put:
 *     summary: Swiperni yangilash
 *     tags: [Swipers]
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
 *               url: { type: string, example: "https://example.com/newimage.png" }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateSwiper/:id", updateSwiper);

/**
 * @swagger
 * /swiper/deleteSwiper/{id}:
 *   delete:
 *     summary: Swiperni o'chirish
 *     tags: [Swipers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/deleteSwiper/:id", deleteSwiper);

module.exports = router;
