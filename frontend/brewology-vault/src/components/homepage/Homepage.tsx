import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <h1>This is a HomePage</h1>
      {/* lets build the home page  */}
    </div>
  );
};

export default HomePage;
