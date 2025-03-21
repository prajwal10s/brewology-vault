import { MiddlewareOptions } from "mongoose";
import { User } from "../models/user"; // Model import
import express, {
  Router,
  Request,
  Response,
  NextFunction,
  CookieOptions,
} from "express";
import { encodeSession } from "../middleware/session";
const bcrypt = require("bcrypt");
const saltRounds = 10;
import * as dotenv from "dotenv";
import { sendEmail } from "../emails/emailsetup";
dotenv.config();
const generateHashedPwd = async (pwd: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
  } catch (error) {
    console.error("There was an error encrypting the password", error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password, role, email } = req.body;
    if (role !== "admin" && role !== "user") {
      return next("Role can only be admin or user");
    }
    const pwdHashed = await generateHashedPwd(password);
    const newUser = new User({
      userName,
      role,
      password: pwdHashed,
      email,
      isActive: false,
    });
    try {
      await newUser.save();
    } catch (error) {
      res.status(500);
      next(error);
    }
    try {
      await sendEmail(email, userName);
    } catch (error) {
      res.status(500);
      next(error);
    }
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;
  try {
    const user: any = await User.findOne({ userName });
    if (!user) {
      res.status(401).json({
        message: "User does not exist. Please recheck or register",
      });
    }
    if (user.isActive === false) {
      res.status(401).json({
        message:
          "Please click on the registration mail sent to your registered email id",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Please check your password" });
      return;
    }
    const secretKey = process.env.SECRET_KEY || "";
    const session = await encodeSession(secretKey, {
      id: user._id,
      userName: user.userName,
    });
    let options: CookieOptions = {
      maxAge: 1000 * 60 * 15, // expire after 15 minutes
      httpOnly: true, // Cookie will not be exposed to client side code
      sameSite: "strict", // If client and server origins are different
      secure: true, // use with HTTPS only
    };
    res.cookie("token", session, options);
    res.status(200).json({ message: "Session created and cookie generated" });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Use true in production with HTTPS
    sameSite: "strict", // Prevent CSRF attacks
    path: "/", // Ensure cookie is cleared across the entire site
  });
  res.status(200).json({ message: "Logged out successfully!" });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.deleteOne({ _id: req.body.id });
    res.status(201).json({ message: "User deleted successfully", user: user });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};
