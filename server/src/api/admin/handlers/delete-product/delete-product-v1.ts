import { Request, Response, NextFunction } from "express";
import { deleteProduct } from "../../services/database/product";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      logger.warn("Invalid or missing product id for deletion.");
      return next(
        new BadRequestError("Product id is required and must be a string.")
      );
    }

    const deletedProduct = await deleteProduct({ id });

    logger.info("Product deleted", { productId: deletedProduct.id });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: deletedProduct,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    logger.error("Error deleting product:", error);
    next(new InternalServerError("Internal server error"));
  }
};
