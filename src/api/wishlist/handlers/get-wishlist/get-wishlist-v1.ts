import { Request, Response, NextFunction } from "express";
import { getWishlistByUserId } from "../../services/database/wishlist";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const getWishlistHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      logger.warn("Invalid or missing userId for fetching wishlist.");
      return next(
        new BadRequestError("userId is required and must be a string.")
      );
    }

    const wishlist = await getWishlistByUserId(userId);

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: wishlist,
      message: "Wishlist fetched successfully.",
    });
  } catch (error) {
    logger.error("Error fetching wishlist:", error);
    next(new InternalServerError("Internal server error"));
  }
};
