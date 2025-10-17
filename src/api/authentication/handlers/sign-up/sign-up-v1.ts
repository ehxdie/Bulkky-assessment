import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createUser, findUser } from "../../services/database/user";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";


export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name) {
      logger.warn("Missing name in sign-up.");
      return next(new BadRequestError("Name is required."));
    }
    if (!email) {
      logger.warn("Missing email in sign-up.");
      return next(new BadRequestError("Email is required."));
    }
    if (!password) {
      logger.warn("Missing password in sign-up.");
      return next(new BadRequestError("Password is required."));
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn("Invalid email format.");
      return next(new BadRequestError("Invalid email format."));
    }

    // Check if email already exists
    const existingUser = await findUser({ email });
    if (existingUser) {
      logger.warn(`Attempt to sign up with existing email: ${email}`);
      return next(
        new BadRequestError("A user with this email already exists.")
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role:
        role && Role[role.toUpperCase() as keyof typeof Role]
          ? (role.toUpperCase() as Role)
          : Role.USER,
    });

    logger.info(`New user signed up: ${user.id}`);

    // Return user info (omit password)
    const { password: _, ...userWithoutPassword } = user;

    res.status(HttpStatusCode.CREATED).json({
      ...userWithoutPassword,
      message: "Sign up successful."
    });
  } catch (error) {
    logger.error("Error during user sign-up:", error);
    next(new InternalServerError("Internal server error"));
  }
};
