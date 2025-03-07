import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipePropsType } from "./recipeType";
import RecipeCard from "./recipeCard";
import FloatingBeans from "./floatingBeans";
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
    <div className="min-h-screen px-4 pt-4 pb-2 bg-fixed bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white">
      <FloatingBeans />
      <div className="relative p-6 rounded-lg">
        {recipeData.map((recipe, index) => (
          <div className="inline-block mx-2" key={index}>
            <RecipeCard recipeData={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Recipe;
