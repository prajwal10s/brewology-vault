import React from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";

axios.defaults.baseURL = "http://localhost:3001";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 text-white">
        <h1>This is an empty homepage for now! </h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
