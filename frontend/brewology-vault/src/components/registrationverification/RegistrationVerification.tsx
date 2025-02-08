import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

const RegistrationVerification: React.FC = () => {
  return (
    <div className="flex h-screen bg-zinc-200 bg-[url('../assets/coffee_1.jpg')]">
      <div className="w-full max-w-sm m-auto bg-zinc-300 rounded-2xl p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            width="48"
            height="48"
            src="https://img.icons8.com/doodle/48/new-post.png"
            alt="new-post"
          />
        </header>
        <body>
          <p className="bg-gray-300 text-amber-700 text-sm float-end pt-2">
            Registration Successful!! Please check your inbox to verify your
            email address.
          </p>
        </body>
      </div>
    </div>
  );
};

export default RegistrationVerification;
