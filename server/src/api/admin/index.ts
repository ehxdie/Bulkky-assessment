import { Router } from "express";
import * as AdminController from "./handlers";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkIsAdmin } from "../../middlewares/checkRoles";


const router = Router({ mergeParams: true });

// Protect all admin routes
router.use(checkJwt, checkIsAdmin);

/**
 * @openapi
 * /admin/products:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/products", AdminController.createProductHandler);

/**
 * @openapi
 * /admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update a product
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/products/:id", AdminController.updateProductHandler);

/**
 * @openapi
 * /admin/products/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/products/:id", AdminController.deleteProductHandler);

export default router;
