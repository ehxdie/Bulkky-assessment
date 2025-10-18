import { Request, Response, NextFunction } from "express";
import { getAllProducts } from "../../services/database/product";
import { HttpStatusCode, InternalServerError } from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const getAllProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProducts();
    logger.info("Fetched all products", { count: products.length });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: products,
      message: "Products fetched successfully.",
    });
  } catch (error) {
    logger.error("Error fetching products:", error);
    next(new InternalServerError("Internal server error"));
  }
};
