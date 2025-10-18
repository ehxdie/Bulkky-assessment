import { Request, Response, NextFunction } from "express";
import { createProduct } from "../../services/database/product";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    // Individual field validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      logger.warn("Invalid or missing product name.");
      return next(
        new BadRequestError(
          "Product name is required and must be a non-empty string."
        )
      );
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      logger.warn("Invalid or missing product description.");
      return next(
        new BadRequestError(
          "Product description is required and must be a non-empty string."
        )
      );
    }
    if (price === undefined || typeof price !== "number" || price < 0) {
      logger.warn("Invalid or missing product price.");
      return next(
        new BadRequestError(
          "Product price is required and must be a non-negative number."
        )
      );
    }
    if (stock === undefined || typeof stock !== "number" || stock < 0) {
      logger.warn("Invalid or missing product stock.");
      return next(
        new BadRequestError(
          "Product stock is required and must be a non-negative number."
        )
      );
    }
    if (
      !imageUrl ||
      typeof imageUrl !== "string" ||
      imageUrl.trim().length === 0
    ) {
      logger.warn("Invalid or missing product imageUrl.");
      return next(
        new BadRequestError(
          "Product imageUrl is required and must be a non-empty string."
        )
      );
    }

    const product = await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      imageUrl,
    });

    logger.info("Product created", { productId: product.id });

    res.status(HttpStatusCode.CREATED).json({
      status: "ok",
      data: product,
      message: "Product created successfully.",
    });
  } catch (error) {
    logger.error("Error creating product:", error);
    next(new InternalServerError("Internal server error"));
  }
};
