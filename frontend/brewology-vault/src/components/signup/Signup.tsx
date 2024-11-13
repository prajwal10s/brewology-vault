import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
interface SignupFormData {
  password: string;
  role: "user" | "mod" | "admin";
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
      console.log(formData);
      const response = await axios.post("/user/add", formData);
      if (response.status === 201) {
        console.log("Signup successfull");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };
  return (
    <div className="Signup-page">
      <h1>Signup Page</h1>
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
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="mod">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
