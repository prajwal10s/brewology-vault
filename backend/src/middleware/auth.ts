import { JwtPayload } from "jsonwebtoken";
import { Session } from "inspector/promises";
import { Request, Response, NextFunction } from "express";
import { decodeSession } from "./session";
import * as dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const unauthorized = (message: string) => {
    res.status(401).json({
      ok: false,
      status: 401,
      message: message,
    });
  };
  const token = req.get("X-JWT-Token");
  if (!token) {
    unauthorized(`Required ${token} not found`);
    return;
  }
  const secretKey: string = process.env.SECRET_KEY || "";
  console.log(secretKey);
  const decodeResult = decodeSession(secretKey, token);
  console.log(decodeResult);
  // Set the session on response.locals object for routes to access
  res.locals = {
    ...res.locals,
    session: Session,
  };

  // Request has a valid or renewed session. Call next to continue to the authenticated route handler
  next();
};
