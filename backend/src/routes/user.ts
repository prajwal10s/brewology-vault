import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUSer,
  checkUser,
} from "../controllers/userController";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/add", addUser);
router.post("/login", checkUser);
router.delete("/:id", deleteUSer);

export default router;
