import express, { Router, Request, Response } from "express";

const router = express.Router();
import {
  getAllRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
} from "../controllers/recipeController";

//add path to get all recipes from given user
router.get("/", getAllRecipes);
router.get("/:id", getRecipe);
router.post("/add", addRecipe);
router.delete("/delete", deleteRecipe);

export default router;
