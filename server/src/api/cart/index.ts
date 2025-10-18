import { Router } from "express";
import * as CartController from "./handlers";
import { checkJwt } from "../../middlewares/checkJwt";

const router = Router({ mergeParams: true });

router.use(checkJwt);

/**
 * @openapi
 * /cart/products:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add a product to the user's cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 */
router.post("/products", CartController.addProductToCartHandler);

/**
 * @openapi
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: View all products in the user's cart
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/", CartController.viewCartHandler);

/**
 * @openapi
 * /cart/products/{cartItemId}:
 *   put:
 *     tags:
 *       - Cart
 *     summary: Update the quantity of a product in the cart
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 */
router.put("/products/:cartItemId", CartController.updateQuantityHandler);

/**
 * @openapi
 * /cart/products/{cartItemId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete a product from the user's cart
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 */
router.delete("/products/:cartItemId", CartController.deleteQuantityHandler);

export default router;
