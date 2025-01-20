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
import { useNavigate } from "react-router-dom";
const BookingRooms = () => {
  const navigate = useNavigate();
 
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
      paymentStatus: "Paid",
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
      paymentStatus: "Unpaid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Unpaid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Unpaid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Unpaid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Paid",
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
      paymentStatus: "Unpaid",
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
      paymentStatus: "Paid",
      actions: ["Edit", "Delete"],
    },
  ];

  return (
    <table className=" text-sm text-left rtl:text-right overflow-scroll ">
      <thead className=" w-full ">
        <tr>
          <td className="px-4 py-4">#</td>
          <th scope="col" className="px-4 py-3">
            Name
          </th>
          <th scope="col" className="px-4 py-3">
            Check In
          </th>
          <th scope="col" className="px-4 py-3">
            Check Out
          </th>
          <th scope="col" className="px-4 py-3">
            Status
          </th>

          <th scope="col" className="px-4 py-3">
            Phone
          </th>
          <th scope="col" className="px-4 py-3">
            Rooms Type
          </th>
          <th scope="col" className="px-4 py-3">
            Invoice
          </th>
          <th scope="col" className="px-4 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className=" w-full">
        {users.map((items, index) => {
          const {
            name,
            checkIn,
            checkOut,
            Gender,
            phone,
            roomsType,
            statusColor,
            id,
            paymentStatus,
          } = items;
          return (
            <tr className="" key={id}>
              <td className="px-4 py-4">{index + 1}</td>

              <td className="px-4 py-4 flex items-center gap-2">
                <FaUser className="text-2xl rounded-full" />
                {name}
              </td>
              <td className="px-4 py-4 ">{checkIn}</td>
              <td className="px-4 py-4">{checkOut}</td>
              <td className="px-4 py-4">
                <button
                  className={` border-1 border-green-500 bg-${statusColor}-500/40 text-purple-600 font-semibold px-3 py-1 rounded-md `}
                >
                  {paymentStatus}
                </button>
              </td>

              <td className="px-4 py-4">{phone}</td>
              <td className="px-4 py-4">{roomsType}</td>
              <td className="px-4 py-4">
                <FaRegFilePdf className="text-purple-600 text-xl cursor-pointer" />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <FaRegEdit className="text-xl text-blue-500 cursor-pointer" />
                  <MdDeleteForever className="text-2xl cursor-pointer text-purple-600 " />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingRooms;
