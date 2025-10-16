import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../../utils/jwt";
import { HttpStatusCode, BadRequestError, UnauthorizedError, InternalServerError } from "../../../../exceptions";
import { logger } from "../../../../utils/logger";
import { findUser } from "../../services/database/user";
import { createFcmToken, updateFcmToken } from "../../../vendor/services/database/pushToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fcmToken } = req.body;

      // Validate inputs
      if (!email || !password) {
        logger.warn("Email and password are required for login.");
        return next(new BadRequestError("Email and password are required."));
      }

      // Find user by email using the service
      const user = await findUser({ email });

      if (!user || !user.password) {
        logger.warn(`Invalid login attempt for email: ${email}`);
        return next(new UnauthorizedError("Invalid email or password."));
      }

      // Check if email is verified
      if (!user.emailVerified && !user.phoneVerified) {
        logger.warn(`Login attempt with unverified Account: ${email}`);
        return next(
          new UnauthorizedError(
            "Please verify your account using your email or phone number before logging in."
          )
        );
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        logger.warn(`Invalid password for email: ${email}`);
        return next(new UnauthorizedError("Invalid email or password."));
      }

      // Generate JWT token
      const token = generateToken({ id: user.id });

      logger.info(`User logged in: ${user.id}`);

      // Register fcm token if provided
      if (fcmToken) {
        await createFcmToken({
          userId: user.id,
          token: fcmToken
        });
      }

      return res.status(HttpStatusCode.OK).json({
        status: "ok",
        data: { token },
      });
    } catch (error) {
        logger.error("Error in login:", error);
        next(new InternalServerError("Internal server error"));
    }
};

/**
 * Unregister or deactivate the token (e.g., on logout)
 * Body: { expoPushToken }
 */

export const deregisterfcmTokenHandler = async (req: Request, res: Response) => {
    try {
        const { fcmToken } = req.body;

        if (!fcmToken) {
            return res.status(400).json({ error: 'fcmToken required' });
        }

        // Use service function to deactivate token and remove user association
        const result = await updateFcmToken(fcmToken);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.json({ ok: true });
    } catch (err) {
        console.error('Error in deregisterTokenHandler:', err);
        return res.status(500).json({ error: 'server error' });
    }
};