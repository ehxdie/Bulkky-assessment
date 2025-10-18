import { Request, Response, NextFunction } from "express";
import { getOrdersByUserId } from "../../services/order";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import type { CustomRequest } from "../../../../middlewares/checkJwt";

export const getOrdersHandler = async (
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

    const orders = await getOrdersByUserId(userId);

    logger.info("Fetched orders for user", {
      userId,
      orderCount: orders.length,
    });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: orders,
      message: "Orders fetched successfully.",
    });
  } catch (error) {
    logger.error("Error fetching orders:", error);
    next(new InternalServerError("Internal server error"));
  }
};
