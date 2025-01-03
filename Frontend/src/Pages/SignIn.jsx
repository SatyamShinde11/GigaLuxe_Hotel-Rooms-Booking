import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const token = sessionStorage.getItem("Token");

  if (!token || token === "false") {
    navigate("/SignUP");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true); 

    try {
      const verifyToken = token.split("+")[1];
      const data = { email, password };

      const response = await axios.post(
        "http://localhost/api/user/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${verifyToken}`,
          },
        }
      );

      console.log(response.data); 
      toast.success("Sign in successful!");
      // navigate("/"); 
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message || "Sign In failed.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="md:px-20 md:py-10 bg-white w-full xl:w-[1280px] mt-14 h-auto flex flex-col items-center font-Poppins overflow-hidden">
      <div className="flex border border-purple-500 md:w-[90%] w-full flex-col md:flex-row rounded-3xl justify-center overflow-hidden relative">
        <div className="md:w-1/2 w-full px-5 md:px-0 text-black py-5 gap-6 flex flex-col">
          <h1 className="font-semibold text-2xl">Sign IN</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                placeholder="Enter Your Password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
              disabled={loading} 
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <Link to="/SignUP">
              <a className="cursor-pointer flex hover:text-purple-700 font-semibold">
                Don't have an account? Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
