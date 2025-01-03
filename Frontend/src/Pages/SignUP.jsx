import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUP = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [getOtp, setGetOtp] = useState("");
  const [visibleOtpBox, setVisibleOtpBox] = useState(false);
  let ReceivedOtp = false;
  const Navigation = useNavigate();

  const createUser = async () => {
    try {
      if (userData.password === confirmPassword) {
        let data = {
          email: userData.email,
          name: userData.name,
          password: userData.password,
        };
        axios
          .post("http://localhost/api/user/signup", {
            method: "POST",
            data,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            const { Token, message } = response.data;

            toast.success(message);
            sessionStorage.setItem("Token", `Giga+${Token}+Luxe`);
            setTimeout(() => {
              Navigation("/SignIN");
            }, 1000);
          })
          .catch((error) => {
            toast.error("Error creating user. Please try again.");
            console.log(error);
          });
      } else {
        toast.error("Password does not match.");
      }
    } catch (error) {
      toast.error("Server Error. Please try again.");
      console.log(error);
    }
  };

  const VerifyEmail = (e) => {
    let code = getOtp;
    let data = {
      code,
      email: userData.email,
    };
    try {
      axios
        .post("http://localhost/api/user/verifyemail", {
          method: "POST",
          data,
          headers: {
            "Content-Type": "application/json",
            authorization: "your token comes here",
          },
        })
        .then((res) => {
          console.log(res.data);
          createUser();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const SendOtp = async () => {
    try {
      axios
        .post("http://localhost/api/user/sendOtp", {
          email: userData.email,
        })
        .then((response) => {
          console.log(response);

          toast.success("OTP has been sent to your email.");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const HandelSubmit = (e) => {
    try {
      if (!userData.email || !userData.password) {
        toast.error("All fields are required!");
        return;
      }
      setVisibleOtpBox(true);

      SendOtp();
      if (ReceivedOtp) {
        return toast.success("OTP has been sent to your email.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="md:px-20 md:py-10 bg-white w-full xl:w-[1280px] mt-10 h-auto flex flex-col items-center font-Poppins overflow-hidden">
      <div className="flex border border-purple-500 md:w-[90%] w-full p-5 flex-col md:flex-row rounded-3xl justify-center overflow-hidden relative">
        <div className="md:w-1/2 text-black py-5 pr-6 gap-6 flex flex-col">
          <h1 className="font-semibold text-2xl">Sign UP</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
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
              <div className="flex flex-col gap-1">
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
              <div className="flex flex-col gap-1">
                <label>Password</label>
                <div className="flex flex-col gap-3">
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
                onClick={HandelSubmit}
                className="px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
              >
                SignUP
              </button>
            </div>

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
                    onClick={VerifyEmail}
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
    </div>
  );
};

export default SignUP;
