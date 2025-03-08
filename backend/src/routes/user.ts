import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import { authMiddlewareAdmin, authMiddlewareUser } from "../middleware/auth";
import { verifyEmail } from "../emails/emailsetup";

const router = express.Router();
router.get("/", authMiddlewareAdmin, getAllUsers);
router.get("/:id", authMiddlewareUser, getUser);
router.post("/add", addUser);
router.post("/login", loginUser);
router.delete("/delete", authMiddlewareUser, deleteUser);
router.get("/verify/:token", verifyEmail);
router.post("/logout", authMiddlewareUser, logoutUser);

export default router;
