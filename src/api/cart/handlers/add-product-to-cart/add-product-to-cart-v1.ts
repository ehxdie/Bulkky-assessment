import { Request, Response, NextFunction } from "express";
import { createCart } from "../../services/database/cartItem";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const addProductToCartHandler = async (
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

    const { productId, quantity } = req.body;

    if (!productId || typeof productId !== "string") {
      logger.warn("Invalid or missing productId for cart.");
      return next(
        new BadRequestError("productId is required and must be a string.")
      );
    }

    if (
      quantity === undefined ||
      typeof quantity !== "number" ||
      quantity < 1
    ) {
      logger.warn("Invalid or missing quantity for cart.");
      return next(
        new BadRequestError(
          "quantity is required and must be a positive number."
        )
      );
    }

    const cartItem = await createCart({
      user: { connect: { id: userId } },
      product: { connect: { id: productId } },
      quantity,
    });

    logger.info("Product added to cart", { cartItemId: cartItem.id });

    res.status(HttpStatusCode.CREATED).json({
      status: "ok",
      data: cartItem,
      message: "Product added to cart successfully.",
    });
  } catch (error) {
    logger.error("Error adding product to cart:", error);
    next(new InternalServerError("Internal server error"));
  }
};
