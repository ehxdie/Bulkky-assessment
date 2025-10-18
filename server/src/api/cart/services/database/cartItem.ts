import { prismaClient } from "../../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../../utils/logger";

// Create a cart item
export const createCart = async (data: Prisma.CartItemCreateInput) => {
  try {
    const cartItem = await prismaClient.cartItem.create({ data });
    logger.info("Cart item created", { cartItemId: cartItem.id });
    return cartItem;
  } catch (error) {
    logger.error("Error creating cart item", { error });
    throw new Error("Failed to create cart item");
  }
};

// Get a single cart item by id
export const getCart = async (id: string) => {
  try {
    const cartItem = await prismaClient.cartItem.findUnique({
      where: { id },
      include: { product: true, user: true },
    });
    return cartItem;
  } catch (error) {
    logger.error("Error fetching cart item", { error });
    throw new Error("Failed to fetch cart item");
  }
};

// Get all cart items (optionally by userId)
export const getAllCarts = async (userId?: string) => {
  try {
    const where = userId ? { userId } : {};
    const cartItems = await prismaClient.cartItem.findMany({
      where,
      include: { product: true, user: true },
    });
    return cartItems;
  } catch (error) {
    logger.error("Error fetching cart items", { error });
    throw new Error("Failed to fetch cart items");
  }
};

// Update a cart item
export const updateCart = async (
  id: string,
  data: Prisma.CartItemUpdateInput
) => {
  try {
    const updatedCartItem = await prismaClient.cartItem.update({
      where: { id },
      data,
    });
    logger.info("Cart item updated", { cartItemId: updatedCartItem.id });
    return updatedCartItem;
  } catch (error) {
    logger.error("Error updating cart item", { error });
    throw new Error("Failed to update cart item");
  }
};

// Delete a cart item
export const deleteCart = async (id: string) => {
  try {
    const deletedCartItem = await prismaClient.cartItem.delete({
      where: { id },
    });
    logger.info("Cart item deleted", { cartItemId: deletedCartItem.id });
    return deletedCartItem;
  } catch (error) {
    logger.error("Error deleting cart item", { error });
    throw new Error("Failed to delete cart item");
  }
};
