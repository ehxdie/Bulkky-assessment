import { prismaClient } from "../../../../utils/prisma";
import type { Prisma } from "@prisma/client";
import { logger } from "../../../../utils/logger";
import { recordActivity } from "../../../admin/services/database/activity";
import { ActivityType } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const user = await prismaClient.user.create({
            data
        });
        logger.info("User created successfully", { userId: user.id });

        // Record activity for user creation
        await recordActivity({
            type: ActivityType.NEW_USER,
            actorId: user.id,
            subjectType: "User",
            subjectId: user.id,
            message: `New user ${user.email} created`,
            meta: {
                email: user.email,
                role: user.role,
            },
        });

        return user;
    } catch (error) {
        logger.error("Error creating user", { error });
        throw new Error('Failed to create user');
    }
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
    try {
        const user = await prismaClient.user.findUnique({ where });
        return user;
    } catch (error) {
        logger.error("Error finding user", { error });
        throw new Error("Failed to find user");
    }
};

export const updateUser = async (
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
) => {
    try {
        const updatedUser = await prismaClient.user.update({
            where,
            data,
        });
        logger.info("User updated successfully", { userId: updatedUser.id });
        return updatedUser;
    } catch (error) {
        logger.error("Error updating user", { error });
        throw new Error('Failed to update user');
    }
};

/**
 * Retrieves all users from the database, including their vendor profile if available.
 * @returns An array of user objects with vendor info.
 */
export const getAllUsers = async () => {
    try {
        const users = await prismaClient.user.findMany({
            include: { vendor: true }
        });
        return users;
    } catch (error) {
        logger.error("Error fetching all users", { error });
        throw new Error("Failed to fetch all users");
    }
};