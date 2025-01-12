import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.baseURL = "http://localhost:3001";

const Recipe: React.FC = () => {
  const [recipeData, setRecipeData] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await axios.get("/recipe", { withCredentials: true });
        console.log(data);
        setRecipeData(data.toString);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getRecipes();
  });
  return (
    <div className="recipes">
      <p>{recipeData}</p>
    </div>
  );
};
export default Recipe;
