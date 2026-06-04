const { Router } = require("express");
const router = Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Kategoriyalarni boshqarish
 */

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: Smartfonlar }
 *               description: { type: string, example: Eng so'nggi rusumdagi telefonlar }
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: Xato ma'lumot }
 */
router.post("/createCategory", createCategory);

/**
 * @swagger
 * /categories/getCategories:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     tags: [Categories]
 *     responses:
 *       200: { description: Ro'yxat }
 */
router.get("/getCategories", getCategories);

/**
 * @swagger
 * /categories/getCategory/{id}:
 *   get:
 *     summary: ID bo'yicha kategoriya olish
 *     tags: [Categories]
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
router.get("/getCategory/:id", getCategoryById);

/**
 * @swagger
 * /categories/updateCategory/{id}:
 *   put:
 *     summary: Kategoriyani yangilash
 *     tags: [Categories]
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
 *               name: { type: string, example: Maishiy texnika }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateCategory/:id", updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{id}:
 *   delete:
 *     summary: Kategoriyani o'chirish
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 */
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
