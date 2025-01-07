import express, { Router, Request, Response } from "express";
import { authMiddlewareAdmin, authMiddlewareUser } from "../middleware/auth";
const router = express.Router();
import {
  getAllRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
} from "../controllers/recipeController";

router.get("/", authMiddlewareUser, getAllRecipes);
router.get("/:id", authMiddlewareUser, getRecipe);
router.post("/add", authMiddlewareUser, addRecipe);
router.delete("/delete", authMiddlewareUser, deleteRecipe);

export default router;
