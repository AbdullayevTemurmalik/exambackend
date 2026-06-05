const { Router } = require("express");
const router = Router();
const { createCart, getCarts, getCartById, updateCart, deleteCart } = require("../controllers/cart.controller");

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Carts
 */

/**
 * @swagger
 * /carts/createCart:
 *   post:
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, card_id]
 *             properties:
 *               user_id: { type: integer }
 *               card_id: { type: integer }
 *     responses:
 *       201: { description: OK }
 */
router.post("/createCart", createCart);

/**
 * @swagger
 * /carts/getCarts:
 *   get:
 *     tags: [Carts]
 *     responses:
 *       200: { description: OK }
 */
router.get("/getCarts", getCarts);

/**
 * @swagger
 * /carts/getCart/{id}:
 *   get:
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get("/getCart/:id", getCartById);

/**
 * @swagger
 * /carts/updateCart/{id}:
 *   put:
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: integer }
 *               card_id: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.put("/updateCart/:id", updateCart);

/**
 * @swagger
 * /carts/deleteCart/{id}:
 *   delete:
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: OK }
 */
router.delete("/deleteCart/:id", deleteCart);

module.exports = router;
