import { Request, Response, NextFunction } from "express";
import { updateCart } from "../../services/database/cartItem";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const updateQuantityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;

    const { cartItemId } = req.params; // Get cartItemId from req.params
    
    const { quantity } = req.body;

    if (!userId) {
      logger.warn(
        "User ID not found in request (auth middleware missing or failed)."
      );
      return next(new BadRequestError("User authentication required."));
    }

    if (!cartItemId || typeof cartItemId !== "string") {
      logger.warn("Invalid or missing cartItemId for update.");
      return next(
        new BadRequestError("cartItemId is required and must be a string.")
      );
    }

    if (
      quantity === undefined ||
      typeof quantity !== "number" ||
      quantity < 1
    ) {
      logger.warn("Invalid or missing quantity for update.");
      return next(
        new BadRequestError(
          "quantity is required and must be a positive number."
        )
      );
    }

    const updatedCartItem = await updateCart(cartItemId, { quantity });

    logger.info("Cart item quantity updated", {
      cartItemId: updatedCartItem.id,
    });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: updatedCartItem,
      message: "Cart item quantity updated successfully.",
    });
  } catch (error) {
    logger.error("Error updating cart item quantity:", error);
    next(new InternalServerError("Internal server error"));
  }
};
