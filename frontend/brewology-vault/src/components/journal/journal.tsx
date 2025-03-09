import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipePropsType } from "./recipeType";
import RecipeCard from "./recipeCard";
import FloatingBeans from "./floatingBeans";
import Header from "../header/Header";
import Footer from "../footer/Footer";
axios.defaults.baseURL = "http://localhost:3001";

const Journal: React.FC = () => {
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 px-4 pt-4 pb-2 bg-fixed bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white">
        <FloatingBeans />
        <div className="relative p-6 rounded-lg">
          {recipeData.map((recipe, index) => (
            <div className="inline-block mx-2 my-2" key={index}>
              <RecipeCard recipeData={recipe} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Journal;
