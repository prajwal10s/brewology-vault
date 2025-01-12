import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001";

interface LoginFormData {
  userName: string;
  password: string;
}
const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", formData, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        navigate("/home");
      }
      navigate("/recipe");
    } catch (error) {
      console.error("There was an error submitting", error);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: LoginFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="flex h-screen bg-zinc-200">
      <div className="w-full max-w-xs m-auto bg-zinc-300 rounded p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/?size=100&id=TKdpkfwePn6s&format=png&color=000000"
          />
        </header>
        <form id="signupForm" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500" id="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" id="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            />
          </div>
        </form>
        <footer>
          <a
            className="text-indigo-700 hover:text-pink-700 text-sm float-left"
            href="#"
          >
            Forgot Password?
          </a>
          <a
            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
            href="#"
          >
            Create Account
          </a>
        </footer>
      </div>
    </div>
  );
};
export default Login;
