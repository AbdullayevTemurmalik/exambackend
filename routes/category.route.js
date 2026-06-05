const { Router } = require("express");
const router = Router();
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories
 */

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *     responses:
 *       201: { description: OK }
 */
router.post("/createCategory", createCategory);

/**
 * @swagger
 * /categories/getCategories:
 *   get:
 *     tags: [Categories]
 *     responses:
 *       200: { description: OK }
 */
router.get("/getCategories", getCategories);

/**
 * @swagger
 * /categories/getCategory/{id}:
 *   get:
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get("/getCategory/:id", getCategoryById);

/**
 * @swagger
 * /categories/updateCategory/{id}:
 *   put:
 *     tags: [Categories]
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
 *               name: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.put("/updateCategory/:id", updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{id}:
 *   delete:
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: OK }
 */
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
