import { Request, Response, NextFunction } from "express";
import { decodeSession } from "./session";

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
};
