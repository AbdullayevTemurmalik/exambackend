const { Router } = require("express");
const router = Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Cards/Products
 */

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [price, category_id]
 *             properties:
 *               image: { type: string }
 *               price: { type: integer }
 *               description: { type: string }
 *               category_id: { type: integer }
 *               discount: { type: integer }
 *               stars: { type: integer }
 *     responses:
 *       201: { description: OK }
 */
router.post("/createProduct", createProduct);

/**
 * @swagger
 * /products/getProducts:
 *   get:
 *     tags: [Cards]
 *     responses:
 *       200: { description: OK }
 */
router.get("/getProducts", getProducts);

/**
 * @swagger
 * /products/getProduct/{id}:
 *   get:
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get("/getProduct/:id", getProductById);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     tags: [Cards]
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
 *               image: { type: string }
 *               price: { type: integer }
 *               description: { type: string }
 *               category_id: { type: integer }
 *               discount: { type: integer }
 *               stars: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.put("/updateProduct/:id", updateProduct);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: OK }
 */
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
