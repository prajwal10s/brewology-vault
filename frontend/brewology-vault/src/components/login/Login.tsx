import React, {
  ChangeEvent,
  MouseEventHandler,
  SyntheticEvent,
  useState,
} from "react";
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
    e: SyntheticEvent<HTMLInputElement | HTMLFormElement>
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: LoginFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="flex h-screen bg-zinc-200 bg-[url('../assets/coffee_1.jpg')]">
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
