import { Request, Response, NextFunction } from "express";
import { createOrder } from "../../services/order";
import {
  getAllCarts,
  deleteCart,
} from "../../../cart/services/database/cartItem";
import {
  HttpStatusCode,
  InternalServerError,
  BadRequestError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const placeOrderFromCartHandler = async (
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

    const cartItems = await getAllCarts(userId);

    if (!cartItems.length) {
      return next(new BadRequestError("Cart is empty."));
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    
    const order = await createOrder({
      user: { connect: { id: userId } },
      total,
      status: "PLACED",
      items: {
        create: cartItems.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    });


    for (const item of cartItems) {
      await deleteCart(item.id);
    }

    res.status(HttpStatusCode.CREATED).json({
      status: "ok",
      data: order,
      message: "Order placed successfully.",
    });
  } catch (error) {
    logger.error("Error placing order from cart:", error);
    next(new InternalServerError("Internal server error"));
  }
};
