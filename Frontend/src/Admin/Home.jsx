import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaPaste,
  FaUsers,
} from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import BookingRooms from "./Components/Utils/BookingRooms.jsx";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const adminKey = sessionStorage.getItem("Admin");


  if (!adminKey) {
    navigate("/admin/login");
  }

  const stats = [
    { icon: <FaPaste className="bg-red-400 text-4xl p-1 text-white" />, label: "Total Booking", value: 1000, color: "bg-red-400" },
    { icon: <FaBed className="bg-green-400 text-4xl p-1 text-white" />, label: "Rooms Available", value: 297, color: "bg-green-400" },
    { icon: <FaUsers className="bg-purple-400 text-4xl p-1 text-white" />, label: "New Customers", value: 1520, color: "bg-purple-400" },
    { icon: <MdAttachMoney className="bg-blue-400 text-4xl p-1 text-white" />, label: "Total Revenue", value: "$2000", color: "bg-blue-400" },
  ];
   

  return (
    <div className="w-full h-auto mt-20 flex flex-col font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6 w-[70vw]">
        <div className="flex flex-wrap gap-4 justify-evenly">
          {stats.map((stat, index) => (
            <div key={index} className="  bg-white p-5 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                {stat.icon}
                <div>
                  <h1 className="font-semibold">{stat.label}</h1>
                  <p className="font-extrabold text-xl">{stat.value}</p>
                </div>
              </div>
              <div className={`border-2 p-1 rounded-3xl ${stat.color}`}></div>
            </div>
          ))}
        </div>
        <div className="bg-white flex flex-col gap-4 p-4 overflow-auto">
          <h1 className="font-semibold">Booking Details</h1>
          <BookingRooms />
        </div>
      </div>
    </div>
  );
};

export default Home;
