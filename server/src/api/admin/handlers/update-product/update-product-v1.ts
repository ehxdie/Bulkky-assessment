import { Request, Response, NextFunction } from "express";
import { updateProduct } from "../../services/database/product";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";

export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;

    if (!id || typeof id !== "string") {
      logger.warn("Invalid or missing product id for update.");
      return next(
        new BadRequestError("Product id is required and must be a string.")
      );
    }

    // Build update data object only with provided fields
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (Object.keys(updateData).length === 0) {
      logger.warn("No product fields provided for update.");
      return next(
        new BadRequestError(
          "At least one product field must be provided for update."
        )
      );
    }

    const updatedProduct = await updateProduct({ id }, updateData);

    logger.info("Product updated", { productId: updatedProduct.id });

    res.status(HttpStatusCode.OK).json({
      status: "ok",
      data: updatedProduct,
      message: "Product updated successfully.",
    });
  } catch (error) {
    logger.error("Error updating product:", error);
    next(new InternalServerError("Internal server error"));
  }
};
