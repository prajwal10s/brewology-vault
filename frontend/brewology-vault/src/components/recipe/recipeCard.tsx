import { useState } from "react";
import { recipePropsType } from "./recipeType";
import coffeeImage from "../../assets/coffee_ex_1.jpg";

const RecipeCard: React.FC<{ recipeData: recipePropsType }> = ({
  recipeData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-orange-100 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        className="w-full h-48 object-cover"
        src={coffeeImage}
        alt="Coffee"
      />
      <div className="p-4">
        {recipeData.equipment && (
          <h3 className="text-xl font-semibold text-gray-800">
            {recipeData.equipment.toUpperCase()} RECIPE
          </h3>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded-full text-sm transition"
        >
          {isOpen ? "Hide Steps" : "View Steps"}
        </button>

        {isOpen && (
          <p className="text-gray-600 text-sm mt-2 transition-all duration-300">
            {recipeData.recipe}
          </p>
        )}

        <div className="flex flex-wrap mt-3">
          {recipeData.milk_based && (
            <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              Milk-Based
            </span>
          )}
          {recipeData.hot ? (
            <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              Hot
            </span>
          ) : (
            <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              Cold
            </span>
          )}
          {recipeData.roast && (
            <span className="bg-slate-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              {recipeData.roast} roast
            </span>
          )}
          {recipeData.grind && (
            <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              {recipeData.grind} grind
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
