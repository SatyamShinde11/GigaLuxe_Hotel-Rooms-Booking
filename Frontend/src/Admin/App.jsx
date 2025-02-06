import React, { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Rooms from "./Components/Rooms.jsx";
import Review from "./Components/Review.jsx";
import Booking from "./Components/Booking.jsx";
import User from "./Components/User.jsx";
import AddRoom from "./Components/Utils/AddRoom.jsx";
import EditRoom from "./Components/Utils/EditRoom.jsx";import Sidebar from "./Components/Utils/Sidebar.jsx";
import { MdDashboard, MdHotel, MdKingBed } from "react-icons/md";
import { FaUser } from "react-icons/fa";


 
const App = () => {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  if (!sessionStorage.getItem("Admin")) {
    navigate("/admin/login");
  }

  return (
    <div className="w-full xl:w-[1280px] py-2  relative h-auto flex font-Poppins bg-white overflow-hidden">
       <style>
        {"#footer{display:none} #navbar{display:none} body{padding:0px} "}
      </style>{" "}
      <Sidebar />
      <div className="flex-1 p-6 ml-8 md:ml-80 ">
        <nav className="fixed w-full md:w-[95vw] bg-white z-50 py-4 px-4 flex justify-between">
          <h1 className="text-2xl font-semibold">
            <span className="text-purple-600 font-extrabold">G</span>iga
            <span className="text-purple-600 font-extrabold">L</span>uxe
          </h1>
          <FaUser onClick={() => setPopUp(true)} className="text-xl cursor-pointer" />
          {popUp && (
            <div onPointerLeave={() => setPopUp(false)} className="border border-purple-600 absolute z-50 top-0 right-0 w-80 bg-white p-5 rounded-lg">
              <h1 className="text-2xl">Admin</h1>
            </div>
          )}
        </nav>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/User" element={<User />} />
          <Route path="/AddRoom" element={<AddRoom />} />
          <Route path="/EditRoom" element={<EditRoom />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
