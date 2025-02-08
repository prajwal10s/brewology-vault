import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
interface SignupFormData {
  password: string;
  role: "user" | "admin";
  userName: string;
  email: string;
}
const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    userName: "",
    password: "",
    role: "user",
    email: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: SignupFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/add", formData);
      if (response.status === 201) {
        navigate("/registrationSuccess");
      }
    } catch (error) {
      console.error("Signup failed: ", error);
    }
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
              Email
            </label>
            <input
              className="w-fit p-2 mb-6 bg-gray-300 border-b-2 border-amber-700 outline-none focus:bg-gray-300"
              type="email"
              name="email"
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
              Register
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
            className="bg-gray-300 text-amber-700 text-sm float-end pt-2"
            href="/login"
          >
            Already have an account? <span className="underline">Login</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
