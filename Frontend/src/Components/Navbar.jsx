import React, { useState } from "react";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
const Navbar = () => {
  const [Response, setResponse] = useState(true);
  const [menu, setMenu] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  return (
    <div
      id="navbar"
      className="w-full xl:w-[1280px]  fixed top-0 bg-white/80 backdrop-blur-sm z-50  "
    >
      <div className=" py-4 px-4 md:px-20 flex items-center justify-between font-Poppins   ">
        <h1 className="flex text-2xl font-semibold  ">
          <span className=" text-purple-600 font-extrabold ">G</span>iga
          <span className=" text-purple-600 font-extrabold ">L</span>uxe
        </h1>
        <div>
          <ul
            className={
              menu
                ? "h-screen text-2xl  flex flex-col  gap-6 font-semibold absolute top-0 right-0 justify-center items-center w-full bg-white "
                : " hidden md:flex text-xl    gap-6 font-semibold  justify-center items-center w-full "
            }
          >
            <MdOutlineClose
              onClick={() => setMenu(false)}
              className="absolute top-5 right-5 text-4xl  md:hidden cursor-pointer"
            />
            <li className="cursor-pointer hover:text-purple-600 ">
              <Link to="/">
                <a onClick={() => setMenu(false)}>Home</a>
              </Link>
            </li>
            <Link to="/AllRooms">
              <a
                onClick={() => setMenu(false)}
                className="'cursor-pointer hover:text-purple-600 "
              >
                {" "}
                Rooms
              </a>
            </Link>
            {/* <li className='cursor-pointer hover:text-purple-600 '>
                            <Link to="/About">
                                <a onClick={() => setMenu(false)}>Contact</a>
                            </Link>
                        </li> */}
            <li className="cursor-pointer hover:text-purple-600 ">
              <Link to="/About">
                <a onClick={() => setMenu(false)}>About</a>
              </Link>
            </li>
            {Response ? (
              <div>
                <Link to="/SignUp">
                  <button className="px-6 py-2  bg-purple-600 hover:bg-purple-700 text-base text-white rounded-lg font-medium flex items-center justify-center">
                    SignUp
                  </button>
                </Link>
              </div>
            ) : (
              <li className=" relative cursor-pointer hover:text-purple-600 ">
                <a onClick={() => setPopUp(true)}>
                  <FaRegUser />
                </a>
                {PopUp && (
                  <div
                    onPointerLeave={() => setPopUp(false)}
                    className="absolute top-0 right-0 p-5 rounded-lg flex flex-col gap-5 w-80 bg-white border border-purple-500 backdrop-blur-sm "
                  >
                    <div className="flex  items-center gap-5">
                      <FaRegUser className="text-3xl" />{" "}
                      <div>
                        <h1>Satyam shinde</h1>
                        <p className="text-sm">satyamshinde067@gmail.com</p>
                      </div>
                    </div>
                    <div className=" flex justify-evenly">
                      <Link to={"/Profile"}>
                        <button className="px-6 py-2  bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center">
                          Profile
                        </button>
                      </Link>
                      <button className="px-6 py-2  bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center">
                        LogOut
                      </button>
                    </div>
                  </div>
                )}
              </li>
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
