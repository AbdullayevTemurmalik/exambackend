const { Router } = require("express");
const router = Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
} = require("../controllers/product.controller");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Mahsulotlar boshqaruvi (CRUD, Search, Filter)
 */

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Yangi mahsulot yaratish
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string, example: iPhone 15 Pro }
 *               description: { type: string, example: 256GB, Titanium Gray }
 *               price: { type: number, example: 1200.00 }
 *               imageUrl: { type: string, example: "https://example.com/iphone15.jpg" }
 *               manufactureDate: { type: string, format: date, example: "2024-01-10" }
 *               category_id: { type: integer, example: 1 }
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: Noto'g'ri ma'lumot }
 */
router.post("/createProduct", createProduct);

/**
 * @swagger
 * /products/getProducts:
 *   get:
 *     summary: Barcha mahsulotlar ro'yxatini olish
 *     tags: [Products]
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 */
router.get("/getProducts", getProducts);

/**
 * @swagger
 * /products/getProduct/{id}:
 *   get:
 *     summary: ID bo'yicha mahsulotni olish
 *     tags: [Products]
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
router.get("/getProduct/:id", getProductById);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Mahsulotlarni ism yoki tavsif bo'yicha qidirish
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: { type: string }
 *         example: iPhone
 *     responses:
 *       200: { description: Natijalar ro'yxati }
 */
router.get("/search", searchProducts);

/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Mahsulotlarni narx va kategoriya bo'yicha filtrlash
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *         example: 500
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *         example: 2000
 *       - in: query
 *         name: category_id
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Filtrlangan natijalar }
 */
router.get("/filter", filterProducts);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     summary: Mahsulotni yangilash
 *     tags: [Products]
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
 *               name: { type: string, example: iPhone 15 Pro Max }
 *               price: { type: number, example: 1300.00 }
 *               imageUrl: { type: string, example: "https://example.com/iphone15-new.jpg" }
 *     responses:
 *       200: { description: Yangilandi }
 *       404: { description: Topilmadi }
 */
router.put("/updateProduct/:id", updateProduct);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Mahsulotni o'chirish
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       204: { description: O'chirildi }
 *       404: { description: Topilmadi }
 */
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
