import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandelSubmit = (e) => {
    e.preventDefault();
 
    if (Email === "admin@gmail.com" && Password === "123") {
      sessionStorage.setItem("Admin", "hii");
      console.log("Login successful");
      navigate("/admin/");
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="md:px-20 bg-white w-full xl:w-[1280px] mt-14 flex flex-col items-center font-Poppins overflow-hidden">
      <div className="flex border border-purple-500 md:w-[90%] py-14 w-full flex-col md:flex-row rounded-3xl justify-center overflow-hidden relative">
        <div className="md:w-1/2 w-full px-5 md:px-0 text-black py-5 gap-6 flex flex-col">
          <h1 className="font-semibold text-2xl">Admin</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                className="border border-purple-600 py-2 px-3 rounded-md"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                className="border border-purple-600 py-2 px-3 rounded-md"
                placeholder="Enter Your Password"
              />
            </div>
            <button
              className="px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
              onClick={HandelSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
