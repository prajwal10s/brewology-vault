import { User } from "../models/User";
import express, { Router, Request, Response } from "express";
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
    const { userName, password, email } = req.body;
    const newUser = new User({ userName, password, email });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {}
};
