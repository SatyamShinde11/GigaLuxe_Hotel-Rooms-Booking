import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import { FaBed, FaUsers, FaCalendarAlt, FaUser } from "react-icons/fa";
import { MdDashboard, MdHotel, MdKingBed } from "react-icons/md";
import Home from "../../Home.jsx";
import Rooms from "../../Components/Rooms";
import Review from "../../Components/Review";
import User from "../../Components/User";
import Booking from "../Booking.jsx";
import AddRoom from "../../Components/Utils/AddRoom";
import EditRoom from "../../Components/Utils/EditRoom";

const Sidebar = () => {
    return (
        <aside className="fixed md:flex z-50 md:w-80 w-max h-screen bg-white flex flex-col gap-2 p-2">
            <Link
                to={"/admin"}
                className="inline items-center md:flex  gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg"
            >
                <MdDashboard className="text-3xl text-purple-600 " />{" "}
                <h1 className="font-semibold  hidden  md:flex hover:text-purple-600 cursor-pointer">
                    Home
                </h1>{" "}
            </Link>
            <Link
                to={"/admin/Booking"}
                className="flex items-center md:flex  gap-4 text-xl p-2 hover:bg-purple-600/10  rounded-lg"
            >
                <MdHotel className="text-3xl text-purple-600 " />{" "}
                <h1 className="font-semibold hidden  md:flex  hover:text-purple-600 cursor-pointer">
                    Booking
                </h1>{" "}
            </Link>
            <Link
                to={"/admin/User"}
                className="flex items-center md:flex  gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg"
            >
                <FaUser className="text-3xl text-purple-600 " />{" "}
                <h1 className="font-semibold hidden  md:flex  hover:text-purple-600 cursor-pointer">
                    User
                </h1>{" "}
            </Link>
            <Link
                to={"/admin/Rooms"}
                className="flex items-center md:flex  gap-4 text-xl p-2 hover:bg-purple-600/10 rounded-lg"
            >
                <MdKingBed className="text-3xl text-purple-600 " />{" "}
                <h1 className="font-semibold hidden  md:flex  hover:text-purple-600 cursor-pointer">
                    Rooms
                </h1>{" "}
            </Link>



        </aside>
    );
};

export default Sidebar;
