import React, { useEffect, useState, useCallback, useContext } from "react";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthData";

const Navbar = () => {
  const { authResponse, setAuthResponse } = useContext(AuthDataContext);
  const [menu, setMenu] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const FetchData = useCallback(async () => {
    try {
      const VerifyToken = localStorage.getItem("AuthToken");
      console.log(VerifyToken);

      if (!VerifyToken) {
        setIsAuthenticated(false);
        return navigate("/SignUp")
      }

      let token = VerifyToken.split("+");

      await axios.get("http://localhost/api/v1/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token[1]}`,
        },
      }).then((response) => {
        console.log(response);
        setAuthResponse(response)
        const { email, name } = response.data.User;
        setUser({ email, name });
        setIsAuthenticated(true);
      }).catch((error) => {
        console.error("Error fetching user data:", error.message);
        setIsAuthenticated(true);
        if (error.response?.data?.success === false) {
          navigate("/SignUp");
        }
      })


    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    setUser({ name: "", email: "" });
    setIsAuthenticated(false);
    navigate("/SignIN");
  };

  return (
    <div
      id="navbar"
      className="w-full xl:w-[1280px] fixed top-0 bg-white/80 backdrop-blur-sm z-50"
    >
      <div className="py-4 px-4 md:px-20 flex items-center justify-between font-Poppins">
        <h1 className="flex text-2xl font-semibold">
          <span className="text-purple-600 font-extrabold">G</span>iga
          <span className="text-purple-600 font-extrabold">L</span>uxe
        </h1>

        <div>
          <ul
            className={
              menu
                ? "h-screen text-2xl flex flex-col gap-6 font-semibold absolute top-0 right-0 justify-center items-center w-full bg-white transition-all ease-in-out duration-300"
                : "hidden md:flex text-xl gap-6 font-semibold justify-center items-center w-full"
            }
          >
            <MdOutlineClose
              onClick={() => setMenu(false)}
              className="absolute top-5 right-5 text-4xl md:hidden cursor-pointer"
            />

            <li className="cursor-pointer hover:text-purple-600">
              <Link to="/" onClick={() => setMenu(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/AllRooms"
                onClick={() => setMenu(false)}
                className="cursor-pointer hover:text-purple-600"
              >
                Rooms
              </Link>
            </li>
            <li className="cursor-pointer hover:text-purple-600">
              <Link to="/About" onClick={() => setMenu(false)}>
                About
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="relative cursor-pointer hover:text-purple-600">
                <span onClick={() => setPopUp(true)}>
                  <FaRegUser />
                </span>
                {PopUp && (
                  <div
                    onPointerLeave={() => setPopUp(false)}
                    className="absolute top-0 right-0 p-5 rounded-lg flex flex-col gap-5 w-80 bg-white border border-purple-500 shadow-lg"
                  >
                    <div className="flex items-center gap-5">
                      <FaRegUser className="text-3xl" />
                      <div>
                        <h1 className="font-medium">{user?.name}</h1>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex justify-evenly">
                      <Link to="/Profile">
                        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center">
                          Profile
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
                      >
                        LogOut
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <div>
                <Link to="/SignUp" onClick={() => setMenu(false)}>
                  <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-base text-white rounded-lg font-medium flex items-center justify-center">
                    SignUp
                  </button>
                </Link>
              </div>
            )}
          </ul>

          <MdMenu
            onClick={() => setMenu(true)}
            className="cursor-pointer text-4xl md:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
