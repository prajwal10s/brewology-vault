import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  loginUser,
} from "../controllers/userController";
import { authMiddlewareUser } from "../middleware/auth";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", authMiddlewareUser, getUser);
router.post("/add", addUser);
router.post("/login", loginUser);
router.delete("/delete", authMiddlewareUser, deleteUser);

export default router;
