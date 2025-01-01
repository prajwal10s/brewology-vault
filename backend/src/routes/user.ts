import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  checkUser,
} from "../controllers/userController";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/add", addUser);
router.post("/login", checkUser);
router.delete("/delete", deleteUser);

export default router;
