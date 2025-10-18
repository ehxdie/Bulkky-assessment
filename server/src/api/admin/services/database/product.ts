import { prismaClient } from "../../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../../utils/logger";

// Create a product
export const createProduct = async (data: Prisma.ProductCreateInput) => {
  try {
    const product = await prismaClient.product.create({ data });
    logger.info("Product created successfully", { productId: product.id });
    return product;
  } catch (error) {
    logger.error("Error creating product", { error });
    throw new Error("Failed to create product");
  }
};

// Update a product
export const updateProduct = async (
  where: Prisma.ProductWhereUniqueInput,
  data: Prisma.ProductUpdateInput
) => {
  try {
    const updatedProduct = await prismaClient.product.update({ where, data });
    logger.info("Product updated successfully", {
      productId: updatedProduct.id,
    });
    return updatedProduct;
  } catch (error) {
    logger.error("Error updating product", { error });
    throw new Error("Failed to update product");
  }
};

// Delete a product
export const deleteProduct = async (where: Prisma.ProductWhereUniqueInput) => {
  try {
    const deletedProduct = await prismaClient.product.delete({ where });
    logger.info("Product deleted successfully", {
      productId: deletedProduct.id,
    });
    return deletedProduct;
  } catch (error) {
    logger.error("Error deleting product", { error });
    throw new Error("Failed to delete product");
  }
};

