import { Request, Response, NextFunction } from "express";
import { getAProduct } from "../../services/database/product";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const getProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      logger.warn("Invalid or missing product id for fetching.");
      return next(
        new BadRequestError("Product id is required and must be a string.")
      );
    }

    const product = await getAProduct({ id });

    if (!product) {
      logger.warn(`Product not found: ${id}`);
      return next(new BadRequestError("Product not found."));
    }

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: product,
      message: "Product fetched successfully.",
    });
  } catch (error) {
    logger.error("Error fetching product:", error);
    next(new InternalServerError("Internal server error"));
  }
};
