import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"; // Import pencil icon
import { recipeData } from "./defaultRecipeData";
axios.defaults.baseURL = "http://localhost:3001";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Function to check if the link is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout", {}, { withCredentials: true }); // Backend should clear the cookie
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Manually clear the cookie
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/explore" className="text-2xl font-bold tracking-wide">
          Brewology Vault
        </Link>
        <nav className="flex items-center space-x-6">
          <button
            onClick={() =>
              navigate("/createRecipe", { state: { recipe: recipeData } })
            }
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            <Plus size={20} />
            <span>Create</span>
          </button>
          <Link
            to="/explore"
            className={`hover:text-gray-300 ${
              isActive("/recipes")
                ? "text-teal-400 border-b-2 border-teal-400"
                : ""
            }`}
          >
            Explore
          </Link>
          <Link
            to="/journal"
            className={`hover:text-gray-300 ${
              isActive("/journal")
                ? "text-teal-400 border-b-2 border-teal-400"
                : ""
            }`}
          >
            Journal
          </Link>
          <Link
            to="/about"
            className={`hover:text-gray-300 ${
              isActive("/about")
                ? "text-teal-400 border-b-2 border-teal-400"
                : ""
            }`}
          >
            About
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
