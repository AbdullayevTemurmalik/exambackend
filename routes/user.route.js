const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchi boshqaruvi (Register, Login, CRUD)
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Yangi foydalanuvchi ro'yxatdan o'tkazish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, firstName, lastName, gender, age, email, password, confirmPassword]
 *             properties:
 *               userName: { type: string, example: temurmalik }
 *               firstName: { type: string, example: Temur }
 *               lastName: { type: string, example: Malik }
 *               gender: { type: string, example: male, enum: [male, female, other] }
 *               age: { type: integer, example: 25 }
 *               email: { type: string, example: dev@example.com }
 *               password: { type: string, example: password123 }
 *               confirmPassword: { type: string, example: password123 }
 *     responses:
 *       201: { description: Muvaffaqiyatli ro'yxatdan o'tildi }
 *       400: { description: Noto'g'ri ma'lumot yoki parollar mos emas }
 *       409: { description: Username yoki Email allaqachon mavjud }
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Tizimga kirish (Login)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, password]
 *             properties:
 *               userName: { type: string, example: temurmalik }
 *               password: { type: string, example: password123 }
 *     responses:
 *       200: { description: Muvaffaqiyatli kirildi }
 *       401: { description: Parol noto'g'ri }
 *       404: { description: Foydalanuvchi topilmadi }
 */
router.post("/login", login);

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     responses:
 *       200: { description: Foydalanuvchilar ro'yxati }
 */
router.get("/getUsers", getUsers);

/**
 * @swagger
 * /users/getUser/{id}:
 *   get:
 *     summary: ID bo'yicha foydalanuvchini olish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       200: { description: Foydalanuvchi ma'lumotlari }
 *       404: { description: Foydalanuvchi topilmadi }
 */
router.get("/getUser/:id", getUserById);

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchi ma'lumotlarini yangilash
 *     tags: [Users]
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
 *               firstName: { type: string, example: Temurmalik }
 *               age: { type: integer, example: 26 }
 *     responses:
 *       200: { description: Yangilandi }
 */
router.put("/updateUser/:id", updateUser);

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
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
router.delete("/deleteUser/:id", deleteUser);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Foydalanuvchilarni qidirish (userName, email, firstName, lastName bo'yicha)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: { type: string }
 *         example: temur
 *     responses:
 *       200: { description: Natijalar ro'yxati }
 */
router.get("/search", searchUser);

module.exports = router;
