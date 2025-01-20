import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaPaste,
  FaRegEdit,
  FaRegFilePdf,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdAttachMoney, MdDeleteForever } from "react-icons/md";
import BookingRooms from "./Components/Utils/BookingRooms";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  let AdminKey = sessionStorage.getItem("Admin");
  if (AdminKey === null) {
    navigate("/admin/login");
  }

  let users = [
    {
      id: 1,
      name: "Jonn Deo",
      checkIn: "12-08-2014",
      checkOut: "12-08-2014",
      status: "Paid",
      statusColor: "green",
      phone: "+91 9325340448",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      name: "Jane Smith",
      checkIn: "15-08-2014",
      checkOut: "17-08-2014",
      status: "Unpaid",
      statusColor: "red",
      phone: "+91 9345678910",
      roomsType: "Double",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 3,
      name: "Michael Brown",
      checkIn: "20-08-2014",
      checkOut: "25-08-2014",
      status: "Paid",
      statusColor: "green",
      phone: "+91 9123456789",
      roomsType: "Suite",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 4,
      name: "Emily Davis",
      checkIn: "05-09-2014",
      checkOut: "10-09-2014",
      status: "Cancelled",
      statusColor: "gray",
      phone: "+91 9876543210",
      roomsType: "Single",
      invoice: "Not Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 5,
      name: "Christopher White",
      checkIn: "12-09-2014",
      checkOut: "15-09-2014",
      status: "Paid",
      statusColor: "green",
      phone: "+91 9988776655",
      roomsType: "Double",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 6,
      name: "Jessica Green",
      checkIn: "18-09-2014",
      checkOut: "20-09-2014",
      status: "Unpaid",
      statusColor: "red",
      phone: "+91 8899776655",
      roomsType: "Suite",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 7,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      status: "Paid",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
  ];

  return (
    <div className="   bg-gray-300/20 p-6  w-full  h-auto flex flex-col  font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6 w-[70vw]">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold">Hi, Admin</h1>
          <div className="flex gap-4 justify-evenly">
            <div className=" w-full h-full bg-white  p-5 rounded-xl flex flex-col justify-evenly gap-2">
              <div className="flex justify-between  ">
                <FaPaste className="bg-red-400 text-4xl rounded-md p-1 text-white" />
                <div>
                  <h1 className="font-semibold ">Total Booking</h1>
                  <p className="font-extrabold text-xl">1000</p>
                </div>
              </div>
              <div className="border-2 p-1 bg-red-400 rounded-3xl"></div>
            </div>
            <div className=" w-full h-full bg-white  p-5 rounded-xl flex flex-col justify-evenly gap-2">
              <div className="flex justify-between  ">
                <FaBed className="bg-green-400 text-4xl rounded-md p-1 text-white" />
                <div>
                  <h1 className="font-semibold ">Rooms Available</h1>
                  <p className="font-extrabold text-xl">297</p>
                </div>
              </div>
              <div className="border-2 p-1 bg-green-400 rounded-3xl"></div>
            </div>
            <div className=" w-full h-full bg-white  p-5 rounded-xl flex flex-col justify-evenly gap-2">
              <div className="flex justify-between  ">
                <FaUsers className="bg-purple-400 text-4xl rounded-md p-1 text-white" />
                <div>
                  <h1 className="font-semibold ">New Customers</h1>
                  <p className="font-extrabold text-xl">1520</p>
                </div>
              </div>
              <div className="border-2 p-1 bg-purple-400 rounded-3xl"></div>
            </div>
            <div className=" w-full h-full bg-white  p-5 rounded-xl flex flex-col justify-evenly gap-2">
              <div className="flex justify-between  ">
                <MdAttachMoney className="bg-blue-400 text-4xl rounded-md p-1 text-white" />
                <div>
                  <h1 className="font-semibold ">Total Revenue</h1>
                  <p className="font-extrabold text-xl">$2000</p>
                </div>
              </div>
              <div className="border-2 p-1 bg-blue-400 rounded-3xl"></div>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col gap-4 p-4">
          <h1 className="font-semibold">Booking Details</h1>

          <div className="relative ">

            <BookingRooms />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
