const { Router } = require("express");
const router = Router();
const {
  addToCart,
  getCarts,
  getCartByUserId,
  getCartById,
  updateCart,
  removeFromCart,
} = require("../controllers/cart.controller");

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Savatchani boshqarish
 */

/**
 * @swagger
 * /carts/add:
 *   post:
 *     summary: Savatchaga mahsulot qo'shish
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, product_id, quantity]
 *             properties:
 *               user_id: { type: integer, example: 1 }
 *               product_id: { type: integer, example: 1 }
 *               quantity: { type: integer, example: 2 }
 *     responses:
 *       201: { description: Qo'shildi }
 *       400: { description: Xato ma'lumot }
 */
router.post("/add", addToCart);

/**
 * @swagger
 * /carts/getCarts:
 *   get:
 *     summary: Barcha savatchalarni olish
 *     tags: [Carts]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getCarts", getCarts);

/**
 * @swagger
 * /carts/user/{userId}:
 *   get:
 *     summary: User ID bo'yicha savatchani olish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 */
router.get("/user/:userId", getCartByUserId);

/**
 * @swagger
 * /carts/getCart/{id}:
 *   get:
 *     summary: ID bo'yicha savatcha elementini olish
 *     tags: [Carts]
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
router.get("/getCart/:id", getCartById);

/**
 * @swagger
 * /carts/updateCart/{id}:
 *   put:
 *     summary: Savatchadagi mahsulot miqdorini yangilash
 *     tags: [Carts]
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
 *               quantity: { type: integer, example: 5 }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateCart/:id", updateCart);

/**
 * @swagger
 * /carts/remove/{id}:
 *   delete:
 *     summary: Savatchadan mahsulotni o'chirish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/remove/:id", removeFromCart);

module.exports = router;
