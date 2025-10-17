import { Request, Response, NextFunction } from "express";
import { createWishlist } from "../../services/database/wishlist";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const createWishlistHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || typeof userId !== "string") {
      logger.warn("Invalid or missing userId for wishlist creation.");
      return next(
        new BadRequestError("userId is required and must be a string.")
      );
    }
    if (!productId || typeof productId !== "string") {
      logger.warn("Invalid or missing productId for wishlist creation.");
      return next(
        new BadRequestError("productId is required and must be a string.")
      );
    }

    const wishlist = await createWishlist({
      user: { connect: { id: userId } },
      product: { connect: { id: productId } }
    });

    logger.info("Wishlist entry created", { wishlistId: wishlist.id });

    res.status(HttpStatusCode.CREATED).json({
      status: "ok",
      data: wishlist,
      message: "Wishlist entry created successfully.",
    });
  } catch (error) {
    logger.error("Error creating wishlist entry:", error);
    next(new InternalServerError("Internal server error"));
  }
};
