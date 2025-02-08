import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/homepage/Homepage";
import Recipe from "./components/recipe/recipe";
import Test from "./components/test/Test";
import RegistrationVerification from "./components/registrationverification/RegistrationVerification";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route
            path="/registrationSuccess"
            element={<RegistrationVerification />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
