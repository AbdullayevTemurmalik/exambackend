const { Router } = require("express");
const router = Router();
const {
  addLike,
  getLikes,
  getLikesByUserId,
  getLikeById,
  removeLike,
} = require("../controllers/like.controller");

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Yoqtirilgan mahsulotlar (Wishlist)
 */

/**
 * @swagger
 * /likes/add:
 *   post:
 *     summary: Mahsulotga like bosish
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, product_id]
 *             properties:
 *               user_id: { type: integer, example: 1 }
 *               product_id: { type: integer, example: 2 }
 *     responses:
 *       201: { description: Like bosildi }
 */
router.post("/add", addLike);

/**
 * @swagger
 * /likes/getLikes:
 *   get:
 *     summary: Barcha likelarni olish
 *     tags: [Likes]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getLikes", getLikes);

/**
 * @swagger
 * /likes/user/{userId}:
 *   get:
 *     summary: User ID bo'yicha likelarni olish
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/user/:userId", getLikesByUserId);

/**
 * @swagger
 * /likes/getLike/{id}:
 *   get:
 *     summary: ID bo'yicha likeni olish
 *     tags: [Likes]
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
router.get("/getLike/:id", getLikeById);

/**
 * @swagger
 * /likes/remove/{id}:
 *   delete:
 *     summary: Liken'ni o'chirish
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/remove/:id", removeLike);

module.exports = router;
