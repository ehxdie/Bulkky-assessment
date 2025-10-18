import { Router } from "express";
import * as WishController from "./handlers";
import { checkJwt } from "../../middlewares/checkJwt";

const router = Router({ mergeParams: true });

router.use(checkJwt);
/**
 * @openapi
 * /wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add a product to user's wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wishlist entry created
 */
router.post("/", WishController.createWishlistHandler);

/**
 * @openapi
 * /wishlist/{userId}:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get all wishlist items for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
router.get("/:userId", WishController.getWishlistHandler);

/**
 * @openapi
 * /wishlist:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Remove a product from user's wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wishlist entry deleted
 */
router.delete("/", WishController.deleteWishlistHandler);

export default router;
