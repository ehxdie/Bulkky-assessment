import { Request, Response, NextFunction } from "express";
import { deleteCart } from "../../services/database/cartItem";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const deleteQuantityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;
    
    const { cartItemId } = req.params; // Get cartItemId from req.params

    if (!userId) {
      logger.warn(
        "User ID not found in request (auth middleware missing or failed)."
      );
      return next(new BadRequestError("User authentication required."));
    }

    if (!cartItemId || typeof cartItemId !== "string") {
      logger.warn("Invalid or missing cartItemId for deletion.");
      return next(
        new BadRequestError("cartItemId is required and must be a string.")
      );
    }

    const deletedCartItem = await deleteCart(cartItemId);

    logger.info("Cart item deleted", {
      cartItemId: deletedCartItem.id,
    });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: deletedCartItem,
      message: "Cart item deleted successfully.",
    });
  } catch (error) {
    logger.error("Error deleting cart item:", error);
    next(new InternalServerError("Internal server error"));
  }
};
