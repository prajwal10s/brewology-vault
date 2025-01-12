import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import HomePage from "./components/homepage/Homepage";
import Recipe from "./components/recipe/recipe";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
