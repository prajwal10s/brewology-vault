import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const VerifyEmail: React.FC = () => {
  const [success, setSuccess] = useState(true);
  const { token } = useParams();
  useEffect(() => {
    const verify = async () => {
      try {
        // console.log(`/user/verify/${token}`);
        const response = await axios.get(`/user/verify/${token}`);
        if (response.status !== 200) {
          setSuccess(false);
          console.log(success);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  });
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
        <div>
          <p className="bg-gray-300 text-amber-700 text-sm pt-2 ">
            {success ? (
              <>
                Email verification Successful!! Please{" "}
                <a className="underline font-bold" href="/login">
                  login
                </a>{" "}
              </>
            ) : (
              "Email verification Unsuccessful. Try again!!!"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;
