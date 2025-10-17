import { prismaClient } from "../../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../../utils/logger";

// Create a wishlist entry
export const createWishlist = async (data: Prisma.WishlistCreateInput) => {
  try {
    const wishlist = await prismaClient.wishlist.create({ data });
    logger.info("Wishlist entry created", { wishlistId: wishlist.id });
    return wishlist;
  } catch (error) {
    logger.error("Error creating wishlist entry", { error });
    throw new Error("Failed to create wishlist entry");
  }
};

// Get all wishlist entries by userId
export const getWishlistByUserId = async (userId: string) => {
  try {
    const wishlist = await prismaClient.wishlist.findMany({
      where: { userId },
      include: { product: true },
    });
    return wishlist;
  } catch (error) {
    logger.error("Error fetching wishlist by userId", { error });
    throw new Error("Failed to fetch wishlist");
  }
};

// Delete wishlist entry by productId and userId
export const deleteWishlist = async (
  userId: string,
  productId: string
) => {
  try {
    const deletedWishlist = await prismaClient.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });
    logger.info("Wishlist entry deleted", { wishlistId: deletedWishlist.id });
    return deletedWishlist;
  } catch (error) {
    logger.error("Error deleting wishlist entry", { error });
    throw new Error("Failed to delete wishlist entry");
  }
};
