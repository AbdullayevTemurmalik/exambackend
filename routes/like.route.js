const { Router } = require("express");
const router = Router();
const { createLike, getLikes, getLikeById, updateLike, deleteLike } = require("../controllers/like.controller");

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Likes
 */

/**
 * @swagger
 * /likes/createLike:
 *   post:
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, product_id]
 *             properties:
 *               user_id: { type: integer }
 *               product_id: { type: integer }
 *     responses:
 *       201: { description: OK }
 */
router.post("/createLike", createLike);

/**
 * @swagger
 * /likes/getLikes:
 *   get:
 *     tags: [Likes]
 *     responses:
 *       200: { description: OK }
 */
router.get("/getLikes", getLikes);

/**
 * @swagger
 * /likes/getLike/{id}:
 *   get:
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.get("/getLike/:id", getLikeById);

/**
 * @swagger
 * /likes/updateLike/{id}:
 *   put:
 *     tags: [Likes]
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
 *               product_id: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.put("/updateLike/:id", updateLike);

/**
 * @swagger
 * /likes/deleteLike/{id}:
 *   delete:
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: OK }
 */
router.delete("/deleteLike/:id", deleteLike);

module.exports = router;
