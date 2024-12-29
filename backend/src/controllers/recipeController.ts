import express, { Router, Request, Response, NextFunction } from "express";
import { Recipe } from "../models/recipe";

//for now the functionality will be that you are able to create your own recipes and then view/delete them\
//later on feed can be added.

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner = req.params.ownerid;
  try {
    const recipes = await Recipe.find({ owner: owner });
    console.log(recipes);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner = req.params.ownerid;
  const recipe = req.body.recipeid;
  try {
    const resultRecipe = await Recipe.find({
      $and: [{ owner: owner }, { recipe: recipe }],
    });
    console.log(resultRecipe);
    res.status(200).json(resultRecipe);
  } catch (error) {
    next(error);
  }
};

export const addRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner = req.params.ownerid;
  try {
    const {
      hot,
      milk_based,
      equipment,
      beans,
      roast,
      grind,
      grind_specs,
      recipe,
    } = req.body;
    const resultRecipe = new Recipe({
      hot,
      milk_based,
      equipment,
      beans,
      roast,
      grind,
      grind_specs,
      recipe,
      owner,
    });
    await resultRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: resultRecipe });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner = req.params.ownerid;
  const recipe = req.body.recipeid;
  try {
    const resultRecipe = await Recipe.find({
      $and: [{ owner: owner }, { recipe: recipe }],
    });
    console.log(resultRecipe);
    res
      .status(200)
      .json({ message: "Recipe deleted Successfully", recipe: resultRecipe });
  } catch (error) {
    next(error);
  }
};