import React, { SyntheticEvent, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001";
const CreateRecipe: React.FC = () => {
  const [recipeData, setRecipeData] = useState({
    equipment: "",
    beans: "",
    roast: "dark",
    grind: "coarse",
    grind_specs: "",
    recipe: "",
    hot: false,
    milk_based: false,
  });

  const navigate = useNavigate();

  // Handle input changes

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle checkboxes properly
    const updatedValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setRecipeData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Recipe:", recipeData);
    // TODO: Send data to backend and save in DB
    try {
      const response = await axios.post("/recipe/add", recipeData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        navigate("/journal");
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white">
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Coffee Recipe
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Equipment & Beans in One Row for smaller layout */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm mb-1">Equipment</label>
                <input
                  type="text"
                  name="equipment"
                  value={recipeData.equipment}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1">Beans (Optional)</label>
                <input
                  type="text"
                  name="beans"
                  value={recipeData.beans}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>
            </div>

            {/* Roast & Grind in One Row for smaller layout*/}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm mb-1">Roast Level</label>
                <select
                  name="roast"
                  value={recipeData.roast}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                >
                  {["light", "medium", "medium dark", "dark"].map((roast) => (
                    <option key={roast} value={roast}>
                      {roast}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1">Grind Size</label>
                <select
                  name="grind"
                  value={recipeData.grind}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                >
                  {["very coarse", "coarse", "fine", "very fine"].map(
                    (grind) => (
                      <option key={grind} value={grind}>
                        {grind}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Grind Specs */}
            <div>
              <label className="block text-sm mb-1">
                Grind Specifications (Grinder & Settings){" "}
              </label>
              <input
                type="text"
                name="grind_specs"
                value={recipeData.grind_specs}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
              />
            </div>

            {/* Recipe Instructions */}
            <div>
              <label className="block text-sm mb-1">Recipe Instructions</label>
              <textarea
                name="recipe"
                value={recipeData.recipe}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                required
              />
            </div>

            {/* Hot & Milk-Based (Centered) */}
            <div className="flex justify-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hot"
                  checked={recipeData.hot}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>Hot</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="milk_based"
                  checked={recipeData.milk_based}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>Milk-Based</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 hover:bg-teal-600 rounded-md text-lg"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
