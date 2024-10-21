import express, { Router, Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUSer,
  testFn,
} from "../controllers/userController";

const router = express.Router();
router.get("/test", testFn);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.delete("/:id", deleteUSer);

export default router;
