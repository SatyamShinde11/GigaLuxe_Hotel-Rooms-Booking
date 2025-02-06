import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUP = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [getOtp, setGetOtp] = useState("");
  const [visibleOtpBox, setVisibleOtpBox] = useState(false);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const data = {
        code: getOtp,
        ...userData,
      };
      await axios
        .post("http://localhost/api/v1/user/verifyemail", data)
        .then((response) => {
          const { Token, message } = response.data;

          toast.success(message);
          localStorage.setItem("AuthToken", `Giga+${Token}+Luxe`);
          setTimeout(() => {
            navigate("/SignIN");
          }, 1000);
        });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    }
  };

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost/api/v1/user/sendOtp", {
        email: userData.email,
      })
        toast.success("OTP has been sent to your email.");
        setVisibleOtpBox(true);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error("All fields are required!");
      return;
    }
    sendOtp();
  };

  return (
    <div className="md:px-20 md:py-10 bg-white w-full xl:w-[1280px] mt-10 h-auto flex flex-col items-center font-Poppins overflow-hidden">
      <div className="flex border border-purple-500 md:w-[90%] w-full p-5 flex-col md:flex-row rounded-3xl justify-center overflow-hidden relative">
        <div className="w-full px-10 text-black py-5 pr-6 gap-6 flex flex-col">
          <h1 className="font-semibold text-2xl">Sign UP</h1>
          <form onSubmit={HandelSubmit} className="flex flex-col gap-4">
            <div className="flex w-full gap-6">
              <div className="flex flex-col gap-1 w-1/2">
                <label>Name</label>
                <input
                  required
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label>Email</label>
                <input
                  required
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>

            <div className="flex w-full gap-6">
              <div className="flex flex-col gap-1 w-1/2">
                <label>Location</label>
                <input
                  required
                  type="text"
                  value={userData.location}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      location: e.target.value,
                    }))
                  }
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Location"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label>Phone Number</label>
                <input
                  required
                  type="number"
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Phone Number"
                />
              </div>
            </div>

            <div className="flex w-full gap-6">
              <div className="flex flex-col gap-1 w-1/2">
                <label>Password</label>
                <input
                  required
                  type="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label>Confirm Password</label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Confirm Your Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
            >
              SignUp
            </button>
          </form>

          {visibleOtpBox && (
            <div className="flex flex-col gap-1">
              <label>Enter Your Gmail Verification Code</label>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  id="GetOtp"
                  value={getOtp}
                  onChange={(e) => setGetOtp(e.target.value)}
                  className="border border-purple-600 py-2 px-3 rounded-md outline-none"
                  placeholder="Enter Your Otp"
                />
                <button
                  onClick={verifyEmail}
                  className="p-2 bg-purple-600 rounded-md text-white font-extrabold cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          <Link to="/SignIN">
            <a className="cursor-pointer flex hover:text-purple-700 font-semibold">
              SignIN
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
