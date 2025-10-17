import { Router } from "express";
import type { Request, Response } from "express";
import authenticationRoutes from "./api/authentication";
import vendorRoutes from "./api/vendor";
import adminRoutes from "./api/admin";
import conversationRoutes from "./api/conversations";
import clientRoutes from "./api/client";
import chatRoutes from "./api/chat";


const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({ message: "ok" });
});
  
router.use("/:version/auth", authenticationRoutes);
router.use("/:version/vendor", vendorRoutes);
router.use("/:version/admin", adminRoutes);
router.use("/:version/conversations", conversationRoutes);
router.use("/:version/client", clientRoutes);
router.use("/:version/chat", chatRoutes);


export default router;