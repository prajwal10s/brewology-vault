import { JwtPayload } from "jsonwebtoken";
import { Session } from "inspector/promises";
import { Request, Response, NextFunction } from "express";
import { decodeSession } from "./session";
import * as dotenv from "dotenv";
import { User } from "../models/user";
dotenv.config();
export const authMiddlewareUser = (
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
    unauthorized(`Required token not found`);
    return;
  }
  const secretKey: string = process.env.SECRET_KEY || "";
  const decodeResult = decodeSession(secretKey, token);
  if (decodeResult.type !== "valid") {
    unauthorized(decodeResult.type);
    return;
  }
  // Set the session on response.locals object for routes to access
  res.locals = {
    ...res.locals,
    session: Session,
  };
  // Request has a valid session. Call next to continue to the authenticated route handler
  next();
};

export const authMiddlewareAdmin = async (
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
    unauthorized(`Required token not found`);
    return;
  }
  const secretKey: string = process.env.SECRET_KEY || "";
  const decodeResult = decodeSession(secretKey, token);
  if (decodeResult.type !== "valid") {
    unauthorized(decodeResult.type);
    return;
  }
  // Set the session on response.locals object for routes to access
  const id = decodeResult.data.id;
  const user = await User.findById(id);
  if (!user) {
    unauthorized(`Error while decoding the token and no user found`);
    return;
  } else if (user.role !== "admin") {
    unauthorized(`Only admins can access this route`);
    return;
  } else {
    res.locals = {
      ...res.locals,
      session: Session,
    };
    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
  }
};
