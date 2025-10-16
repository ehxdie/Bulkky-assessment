import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createUser, findUser } from "../../services/database/user";
import {
  HttpStatusCode,
  BadRequestError,
  InternalServerError,
} from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import { isValidEmail, isValidPhone } from "../../../../utils/validations";
import { generateToken } from "../../../../utils/jwt";
import { formatPhoneToInternational } from "../../../../utils/phoneService";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, middleName, phone, lastName, email, password, role } =
      req.body;

    // Validate required fields
    if (!firstName) {
      logger.warn("Missing firstName in sign-up.");
      return next(new BadRequestError("First name is required."));
    }
    if (!lastName) {
      logger.warn("Missing lastName in sign-up.");
      return next(new BadRequestError("Last name is required."));
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
    if (!isValidEmail(email)) {
      logger.warn("Invalid email format.");
      return next(new BadRequestError("Invalid email format."));
    }

    const country = "nga";
    let formattedPhoneNumber;

    if (phone) {
      formattedPhoneNumber = formatPhoneToInternational(phone, country);
      // Check if phone already exists
      const existingPhoneUser = await findUser({
        phone: formattedPhoneNumber,
      });
      if (existingPhoneUser) {
        logger.warn(
          `Attempt to sign up with existing phone: ${formattedPhoneNumber}`
        );
        return next(
          new BadRequestError("A user with this phone number already exists.")
        );
      }
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
      firstName,
      middleName,
      lastName,
      phone: formattedPhoneNumber,
      email,
      password: hashedPassword,
      role:
        role && UserRole[role.toUpperCase() as keyof typeof UserRole]
          ? (role.toUpperCase() as UserRole)
          : UserRole.NULL,
    });

    // Generate sign-up token (JWT)
    const signUpToken = generateToken({ id: user.id });

    logger.info("Sign up token generated", { signUpToken });

    // Return user info (omit password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(HttpStatusCode.CREATED).json({
      ...userWithoutPassword,
      message: "Sign up successful.",
      token: signUpToken,
    });
  } catch (error) {
    logger.error("Error during user sign-up:", error);
    next(new InternalServerError("Internal server error"));
  }
};
