import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  loginUser,
} from "../controllers/userController";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/add", addUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

export default router;
