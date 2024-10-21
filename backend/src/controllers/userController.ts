import { User } from "../models/user";
import express, { Router, Request, Response } from "express";
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

export const testFn = async (req: Request, res: Response) => {
  // try {
  //   const hash = await generateHashedPwd("Prj!");
  //   res.json('Password encrypted');
  // } catch (error) {
  //   res.status(500).json({ message: "Error encrypting password", error });
  // }
  res.json("This is a test route");
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "User not found", error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { userName, password, role, email } = req.body;
    if (!userName || !password || !email)
      res.status(400).json({ message: "Please enter all required details" });
    if (role != "admin" && role != "mod" && role != "user")
      res.status(400).json({ message: "Role mentioned is incorrect" });
    const pwdHashed = await generateHashedPwd(password);
    const newUser = new User({ userName, role, password: pwdHashed, email });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ messsage: `Error creating user ${error.message}`, error });
  }
};

export const deleteUSer = async (req: Request, res: Response) => {
  try {
    const user = User.findById(req.body.id);
    res.status(201).json({ message: "User deleted successfully", user: user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `The user doesn't exist ${error.message}`, error });
  }
};
