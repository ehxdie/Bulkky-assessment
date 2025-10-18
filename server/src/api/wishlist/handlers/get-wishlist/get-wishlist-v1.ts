import { Request, Response, NextFunction } from "express";
import { getWishlistByUserId } from "../../services/database/wishlist";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import { CustomRequest } from "../../../../middlewares/checkJwt";

export const getWishlistHandler = async (
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
