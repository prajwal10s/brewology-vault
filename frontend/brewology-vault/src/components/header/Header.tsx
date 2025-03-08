import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Function to check if the link is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout", {}, { withCredentials: true }); // Backend should clear the cookie
      console.log("Cookie deleted successfully!!");
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
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Brewology Vault
        </Link>
        <nav className="space-x-6">
          <Link
            to="/recipes"
            className={`hover:text-gray-300 ${
              isActive("/recipes")
                ? "text-teal-400 border-b-2 border-teal-400"
                : ""
            }`}
          >
            Recipes
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
