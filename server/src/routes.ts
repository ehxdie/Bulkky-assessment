import { Router } from "express";
import type { Request, Response } from "express";
import adminRoutes from "./api/admin";
import authenticationRoutes from "./api/authentication";
import cartRoutes from "./api/cart";
import orderRoutes from "./api/orders";
import wishlistRoutes from "./api/wishlist";
import clientRoutes from "./api/client";


const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({ message: "ok" });
});

router.use("/:version/admin", adminRoutes);
router.use("/:version/auth", authenticationRoutes);
router.use("/:version/cart", cartRoutes);
router.use("/:version/orders", orderRoutes);
router.use("/:version/wishlist", wishlistRoutes);
router.use("/:version/client", clientRoutes);


export default router;