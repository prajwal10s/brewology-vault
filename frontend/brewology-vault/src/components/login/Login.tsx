import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import bgImage from "../../assets/background/coffee_1.jpg";

axios.defaults.baseURL = "http://localhost:3001";

interface LoginFormData {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      navigate("/login", { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const [formData, setFormData] = useState<LoginFormData>({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/journal");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Please try again";
      navigate("/login", { state: { error: errorMessage } });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: LoginFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div
      className="flex h-screen bg-zinc-200"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-sm m-auto bg-zinc-300 rounded-2xl p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/?size=100&id=iFHZuXB_CtBs&format=png&color=000000"
          />
        </header>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-amber-700" id="userName">
              Username
            </label>
            <input
              className="w-fit p-2 mb-6 bg-gray-300 border-b-2 border-amber-700 outline-none focus:bg-gray-300"
              type="text"
              name="userName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-amber-700" id="password">
              Password
            </label>
            <input
              className="w-fit p-2 mb-6 bg-gray-300 border-b-2 border-amber-700 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              className="w-auto max-w-full min-w-28 font-bold text-gray-300 bg-amber-800 rounded-2xl"
              type="submit"
            >
              Login
            </button>
          </div>
          <div>
            {error && <p style={{ color: "red", margin: "2px" }}>{error}</p>}
          </div>
        </form>
        <footer>
          {/* <a
            className="bg-gray-300 text-amber-700 hover:text-pink-700 text-sm float-left"
            href="/signup"
          >
            Forgot Password?
          </a> */}
          <a
            className="bg-gray-300 text-amber-700 underline text-sm float-end pt-2"
            href="/signup"
          >
            Create Account
          </a>
        </footer>
      </div>
    </div>
  );
};
export default Login;
