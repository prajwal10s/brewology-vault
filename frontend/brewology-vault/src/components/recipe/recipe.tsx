import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipePropsType } from "./recipeType";
import RecipeCard from "./recipeCard";
axios.defaults.baseURL = "http://localhost:3001";

const Recipe: React.FC = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<recipePropsType[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("/recipe", { withCredentials: true });
        setRecipeData(response.data);
      } catch (error: any) {
        navigate("/login");
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
