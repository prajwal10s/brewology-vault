import express, { Router, Request, Response } from "express";
import { User } from "../models/User";
import { getAllUsers, getUser, addUser } from "../controllers/userController";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
export default router;
