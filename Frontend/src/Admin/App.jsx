import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Rooms from "./Components/Rooms.jsx";
import {
  MdDashboard,
  MdEdit,
  MdHotel,
  MdKingBed,
  MdMessage,
} from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import Review from "./Components/Review.jsx";
import Booking from "./Components/Booking.jsx";
import User from "./Components/User.jsx";
import AddRoom from "./Components/Utils/AddRoom.jsx";
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let AdminKey = sessionStorage.getItem("Admin");
    if (!AdminKey) {
      navigate("/admin/login");
    }
  });
  const [Response, setResponse] = useState(false);
  const [menu, setMenu] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  return (
    <div className="w-full xl:w-[1280px] flex flex-col font-Poppins p-0 overflow-hidden   ">
      <style>
        {"#footer{display:none} #navbar{display:none} body{padding:0px} "}
      </style>{" "}
      <nav className="fixed w-[95vw] bg-white  z-50">
        <div className=" py-4 px-4 md:px-9 flex items-center justify-between font-Poppins   ">
          <h1 className="flex text-2xl font-semibold  ">
            <span className=" text-purple-600 font-extrabold ">G</span>iga
            <span className=" text-purple-600 font-extrabold ">L</span>uxe
          </h1>
          <div className="flex gap-5 items-center relative">
            {/* <MdOutlineNotificationsActive className="text-2xl cursor-pointer" /> */}
            <FaRegUser
              onClick={() => setPopUp(true)}
              className="text-xl cursor-pointer "
            />
            {PopUp && (
              <div onPointerLeave={()=>setPopUp(false)} className=" border flex flex-col gap-4 border-purple-600 absolute top-0 right-0 w-80   bg-white/90 p-5 rounded-lg">
             <h1 className="text-2xl">Admin</h1>
             <div>
              <button className="px-4 py-1  bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center">LogOut</button>
             </div>
              </div>
            )}
          </div>
        </div>{" "}
      </nav>
      <div className="flex gap-2   mt-16">
        <aside className=" fixed z-50 w-80 h-screen bg-white flex flex-col gap-2 p-2">
          <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <MdDashboard className="text-3xl cursor-pointer text-purple-600" />{" "}
            <Link to={"/admin"}>
              {" "}
              <h1 className="font-semibold hover:text-purple-600 cursor-pointer">
                Home
              </h1>
            </Link>
          </div>
          <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <MdHotel className="text-3xl cursor-pointer text-purple-600" />{" "}
            <Link to={"/admin/Booking"}>
              <h1 className="font-semibold hover:text-purple-600 cursor-pointer">
                Booking
              </h1>
            </Link>
          </div>
          <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <FaUser className="text-2xl cursor-pointer text-purple-600" />{" "}
            <Link to={"/admin/User"}>
              {" "}
              <h1 className="font-semibold hover:text-purple-600 cursor-pointer">
                User
              </h1>
            </Link>
          </div>
          <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <MdKingBed className="text-3xl cursor-pointer text-purple-600" />{" "}
            <Link to={"/admin/Rooms"}>
              <h1 className="font-semibold hover:text-purple-600 cursor-pointer">
                Rooms
              </h1>
            </Link>
          </div>
          {/* <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <MdEdit className="text-3xl cursor-pointer text-purple-600" /><Link>          <h1 className="font-semibold hover:text-purple-600 cursor-pointer">Edit Room</h1>
            </Link> 
  
          </div> */}
          {/* <div className="flex w-full items-center gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg">
            <MdMessage className="text-3xl cursor-pointer text-purple-600" />{" "}
            <Link  to={"/admin/Review"}>
              <h1 className="font-semibold hover:text-purple-600 cursor-pointer">
                Review
              </h1>
            </Link>
          </div> */}
        </aside>
        <div className="ml-80">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Rooms" element={<Rooms />} />

            <Route path="/Review" element={<Review />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/User" element={<User />} />
            <Route path="/AddRoom" element={<AddRoom />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
