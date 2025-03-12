import { useState, useEffect, useRef } from "react";
import { recipePropsType } from "./recipeType";
import coffeeImage from "../../assets/coffee_ex_1.jpg";
import { HandPlatter, MoreVertical, X } from "lucide-react"; // Lucide icons
import { useNavigate } from "react-router-dom";

const RecipeCard: React.FC<{ recipeData: recipePropsType }> = ({
  recipeData,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClone = () => {
    navigate("/createRecipe", { state: { recipe: recipeData } });
  };

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-orange-100 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Options Button */}
      <div className="absolute top-3 right-3" ref={optionsRef}>
        <button onClick={() => setShowOptions(!showOptions)} className="p-2">
          <MoreVertical
            size={25}
            className="text-white font-extrabold hover:text-gray-400"
          />
        </button>

        {/* Options Dropdown */}
        {showOptions && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-white/90 shadow-md rounded-md text-sm border border-gray-300 z-20">
            <button
              onClick={() => handleClone()}
              className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200"
            >
              📑 Clone
            </button>
            <button className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100">
              🗑️ Delete
            </button>
            <button className="block px-4 py-2 w-full text-left text-green-700 hover:bg-green-100">
              📤 Post
            </button>
            <button className="block px-4 py-2 w-full text-left text-blue-700 hover:bg-blue-100">
              ✏️ Edit
            </button>
          </div>
        )}
      </div>

      {/* Recipe Image */}
      <img
        className="w-full h-48 object-cover"
        src={coffeeImage}
        alt="Coffee"
      />

      {/* Content */}
      <div className="p-4">
        {recipeData.equipment && (
          <h3 className="text-xl font-semibold text-gray-800">
            {recipeData.equipment.toUpperCase()} RECIPE
          </h3>
        )}

        {/* View Steps Button - Opens Popup */}
        <button
          onClick={() => setShowPopup(true)}
          className="mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded-full text-sm transition"
        >
          View Steps
        </button>

        {/* Tags */}
        <div className="flex flex-wrap mt-3">
          {recipeData.milk_based && (
            <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              Milk-Based
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 ${
              recipeData.hot
                ? "bg-red-200 text-red-700"
                : "bg-blue-200 text-blue-700"
            }`}
          >
            {recipeData.hot ? "Hot" : "Cold"}
          </span>
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

      {/* Pop-Up Overlay for Recipe Steps */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Recipe Steps
            </h2>
            <p className="text-gray-700">{recipeData.recipe}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
