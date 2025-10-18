import { Request, Response, NextFunction } from "express";
import { deleteWishlist } from "../../services/database/wishlist";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import { CustomRequest } from "../../../../middlewares/checkJwt";

export const deleteWishlistHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }
    const { productId } = req.body;

    if (!userId || typeof userId !== "string") {
      logger.warn("Invalid or missing userId for wishlist deletion.");
      return next(
        new BadRequestError("userId is required and must be a string.")
      );
    }
    if (!productId || typeof productId !== "string") {
      logger.warn("Invalid or missing productId for wishlist deletion.");
      return next(
        new BadRequestError("productId is required and must be a string.")
      );
    }

    const deletedWishlist = await deleteWishlist(userId, productId);

    logger.info("Wishlist entry deleted", { wishlistId: deletedWishlist.id });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: deletedWishlist,
      message: "Wishlist entry deleted successfully.",
    });
  } catch (error) {
    logger.error("Error deleting wishlist entry:", error);
    next(new InternalServerError("Internal server error"));
  }
};
