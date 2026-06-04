const { Router } = require("express");
const router = Router();
const {
  addOrderItem,
  getOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItem.controller");

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Buyurtma elementlarini boshqarish
 */

/**
 * @swagger
 * /orderItems/add:
 *   post:
 *     summary: Buyurtmaga mahsulot qo'shish
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [order_id, product_id, quantity, price]
 *             properties:
 *               order_id: { type: integer, example: 1 }
 *               product_id: { type: integer, example: 1 }
 *               quantity: { type: integer, example: 1 }
 *               price: { type: number, example: 1200.00 }
 *     responses:
 *       201: { description: Qo'shildi }
 */
router.post("/add", addOrderItem);

/**
 * @swagger
 * /orderItems/getOrderItems:
 *   get:
 *     summary: Barcha buyurtma elementlarini olish
 *     tags: [OrderItems]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getOrderItems", getOrderItems);

/**
 * @swagger
 * /orderItems/order/{orderId}:
 *   get:
 *     summary: Buyurtma ID bo'yicha tarkibni olish
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/order/:orderId", getOrderItemsByOrderId);

/**
 * @swagger
 * /orderItems/getOrderItem/{id}:
 *   get:
 *     summary: ID bo'yicha buyurtma elementini olish
 *     tags: [OrderItems]
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
router.get("/getOrderItem/:id", getOrderItemById);

/**
 * @swagger
 * /orderItems/updateOrderItem/{id}:
 *   put:
 *     summary: Buyurtma elementini yangilash
 *     tags: [OrderItems]
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
 *               quantity: { type: integer, example: 3 }
 *               price: { type: number, example: 1150.00 }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateOrderItem/:id", updateOrderItem);

/**
 * @swagger
 * /orderItems/deleteOrderItem/{id}:
 *   delete:
 *     summary: Buyurtma elementini o'chirish
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/deleteOrderItem/:id", deleteOrderItem);

module.exports = router;
