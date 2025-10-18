import { Router } from "express";
import * as OrderController from "./handlers";
import { checkJwt } from "../../middlewares/checkJwt";


const router = Router({ mergeParams: true });

router.use(checkJwt);

/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Place an order from the user's cart
 *     description: Creates a new order using all items in the authenticated user's cart.
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       400:
 *         description: Cart is empty or user not authenticated
 */
router.post("/", OrderController.placeOrderFromCartHandler);

/**
 * @openapi
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders for the authenticated user
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       400:
 *         description: User not authenticated
 */
router.get("/", OrderController.getOrdersHandler);

export default router;
