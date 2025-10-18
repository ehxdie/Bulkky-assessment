import { prismaClient } from "../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../utils/logger";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  try {
    const order = await prismaClient.order.create({
      data,
      include: { items: true },
    });
    logger.info("Order created", { orderId: order.id });
    return order;
  } catch (error) {
    logger.error("Error creating order", { error });
    throw new Error("Failed to create order");
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const orders = await prismaClient.order.findMany({
      where: { userId },
      include: { items: true },
    });
    logger.info("Orders fetched", { userId, orderCount: orders.length });
    return orders;
  } catch (error) {
    logger.error("Error fetching orders", { error });
    throw new Error("Failed to fetch orders");
  }
};