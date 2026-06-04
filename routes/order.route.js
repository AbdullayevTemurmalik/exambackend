const { Router } = require("express");
const router = Router();
const {
  createOrder,
  getOrders,
  getOrdersByUserId,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Buyurtmalarni boshqarish
 */

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Yangi buyurtma yaratish
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, total_amount]
 *             properties:
 *               user_id: { type: integer, example: 1 }
 *               total_amount: { type: number, example: 250.50 }
 *               status: { type: string, example: pending, enum: [pending, completed, cancelled] }
 *     responses:
 *       201: { description: Yaratildi }
 */
router.post("/create", createOrder);

/**
 * @swagger
 * /orders/getOrders:
 *   get:
 *     summary: Barcha buyurtmalarni olish
 *     tags: [Orders]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getOrders", getOrders);

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: User ID bo'yicha buyurtmalarni olish
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/user/:userId", getOrdersByUserId);

/**
 * @swagger
 * /orders/getOrder/{id}:
 *   get:
 *     summary: ID bo'yicha buyurtmani olish
 *     tags: [Orders]
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
router.get("/getOrder/:id", getOrderById);

/**
 * @swagger
 * /orders/updateOrder/{id}:
 *   put:
 *     summary: Buyurtmani yangilash
 *     tags: [Orders]
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
 *               status: { type: string, example: completed }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateOrder/:id", updateOrder);

/**
 * @swagger
 * /orders/deleteOrder/{id}:
 *   delete:
 *     summary: Buyurtmani o'chirish
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/deleteOrder/:id", deleteOrder);

module.exports = router;
