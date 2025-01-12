import axios from "axios";
import React, { useEffect, useState } from "react";
import { recipePropsType } from "./recipeType";
import RecipeCard from "./recipeCard";
axios.defaults.baseURL = "http://localhost:3001";

const Recipe: React.FC = () => {
  const [recipeData, setRecipeData] = useState<recipePropsType[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("/recipe", { withCredentials: true });

        //console.log(response.data);
        setRecipeData(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getRecipes();
  }, []);
  return (
    <div className="recipes">
      {recipeData.map((recipe, index) => (
        <RecipeCard key={index} recipeData={recipe} />
      ))}
    </div>
  );
};
export default Recipe;
