import { Request, Response, NextFunction } from "express";
import { getAllCarts } from "../../services/database/cartItem";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const viewCartHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;

    if (!userId) {
      logger.warn(
        "User ID not found in request (auth middleware missing or failed)."
      );
      return next(new BadRequestError("User authentication required."));
    }

    const cartItems = await getAllCarts(userId);

    logger.info("Fetched cart items for user", {
      userId,
      count: cartItems.length,
    });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: cartItems,
      message: "Cart fetched successfully.",
    });
  } catch (error) {
    logger.error("Error fetching cart items:", error);
    next(new InternalServerError("Internal server error"));
  }
};
