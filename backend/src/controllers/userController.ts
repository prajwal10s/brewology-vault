import { MiddlewareOptions } from "mongoose";
import { User } from "../models/user"; // Model import
import express, {
  Router,
  Request,
  Response,
  response,
  NextFunction,
} from "express";
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    const user = User.findById(req.params.id);
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
    if (role !== "admin" && role !== "user" && role !== "mod") {
      return next("Role can only be admin, mod or user");
    }
    const pwdHashed = await generateHashedPwd(password);
    const newUser = new User({ userName, role, password: pwdHashed, email });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};

export const deleteUSer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = User.findById(req.body.id);
    res.status(201).json({ message: "User deleted successfully", user: user });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;
  try {
    const user: any = await User.findOne({ userName });
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) res.status(201).json({ message: "Temp fn called successfully" });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
};
