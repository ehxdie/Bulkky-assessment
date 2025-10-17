import { prismaClient } from "../../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../../utils/logger";

// Get all products
export const getAllProducts = async () => {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (error) {
    logger.error("Error fetching products", { error });
    throw new Error("Failed to fetch products");
  }
};

// Get a single product
export const getAProduct = async (where: Prisma.ProductWhereUniqueInput) => {
  try {
    const product = await prismaClient.product.findUnique({ where });
    return product;
  } catch (error) {
    logger.error("Error fetching product", { error });
    throw new Error("Failed to fetch product");
  }
};
