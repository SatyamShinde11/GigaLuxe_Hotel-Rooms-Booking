import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";
import {
  FaPlus,
  FaRegEdit,
  FaRegFileExcel,
  FaRegFilePdf,
  FaUser,
} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

import { MdDeleteForever, MdRefresh } from "react-icons/md";
import BookingRooms from "./Utils/BookingRooms.jsx";
import { useNavigate } from "react-router-dom";
const Booking = () => {
  const navigate = useNavigate();

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  let users = [
    {
      id: 1,
      name: "Jonn Deo",
      checkIn: "12-08-2014",
      checkOut: "12-08-2014",
      Gender: "Male",
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
      Gender: "Male",
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
      Gender: "Male",
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
      Gender: "Male",
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
      Gender: "Male",
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
      Gender: "Male",
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
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 8,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 9,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 10,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 11,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 12,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
    {
      id: 13,
      name: "David Wilson",
      checkIn: "22-09-2014",
      checkOut: "26-09-2014",
      Gender: "Male",
      statusColor: "green",
      phone: "+91 7766554433",
      roomsType: "Single",
      invoice: "Available",
      actions: ["Edit", "Delete"],
    },
  ];

  return (
    <div className=" w-full h-auto mt-20 flex flex-col font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="bg-white flex flex-col gap-4 p-4 w-[70vw] ">
          <div className="flex items-center flex-wrap gap-3 md:gap-0  justify-center md:justify-between">
            <h1 className="font-semibold text-nowrap ">Booking Details</h1>
            <div className="relative    flex">


              <div className="flex flex-wrap justify-between gap-2 items-center px-3  py-3 ">
                <FaRegFileExcel className="text-xl text-purple-600" />{" "}
                <button
                  onClick={onDownload}
                  className="hover:text-purple-600 font-semibold text-md"
                >
                  {" "}
                  Export Data{" "}
                </button>
              </div>

              <div className="flex justify-between  items-center px-3  py-3 ">
                <MdRefresh className=" cursor-pointer text-2xl text-purple-600 font-semibold " />{" "}
              </div>

            </div>
          </div>

          <div className="relative overflow-auto scroll- ">
            <BookingRooms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
