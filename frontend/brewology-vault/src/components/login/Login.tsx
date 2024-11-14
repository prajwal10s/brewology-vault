import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setFlagsFromString } from "v8";
import { access } from "fs";
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
      const response = await axios.post("/login");
      if (response.status === 201) {
        console.log("Login successfull");
        navigate("/login");
      }
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
    <div className="LoginForm">
      <h1>Login Page</h1>
      <form id="signupForm" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default Login;
