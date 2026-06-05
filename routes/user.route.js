const { Router } = require("express");
const router = Router();
const { register, login, getUsers, getUserById, deleteUser } = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, firstName, lastName, email, password]
 *             properties:
 *               userName: { type: string }
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               gender: { type: string }
 *               age: { type: integer }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: OK }
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, password]
 *             properties:
 *               userName: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.post("/login", login);

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200: { description: OK }
 */
router.get("/getUsers", getUsers);

/**
 * @swagger
 * /users/getUser/{id}:
 *   get:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get("/getUser/:id", getUserById);

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: OK }
 */
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
