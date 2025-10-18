import { Router } from "express";
import * as ClientController from "./handlers";
import { checkJwt } from "../../middlewares/checkJwt";

const router = Router({ mergeParams: true });

router.use(checkJwt);

/**
 * @openapi
 * /client/products:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Products fetched successfully
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
 *                     $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 */
router.get("/products", ClientController.getAllProductsHandler);

/**
 * @openapi
 * /client/products/{id}:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get a single product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       400:
 *         description: Product not found
 */
router.get("/products/:id", ClientController.getProductHandler);

export default router;
