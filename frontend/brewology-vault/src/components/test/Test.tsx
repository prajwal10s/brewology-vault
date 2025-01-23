import React from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const Test: React.FC = () => {
  const testFunc = async () => {
    try {
      const response = await axios.post("/user/sendEmail");
      console.log(response);
    } catch (error) {
      console.error(
        "There was an issue sending the email! Please try again later."
      );
    }
  };
  return (
    <div className="flex h-screen bg-zinc-200 bg-[url('../assets/coffee_1.jpg')]">
      <h1>This is a Test page</h1>
      <div className="bg-left-top">
        <button
          type="button"
          onClick={testFunc}
          className="w-auto max-w-sm m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Click to test
        </button>
      </div>
    </div>
  );
};

export default Test;
