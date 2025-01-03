import React, { useState, useRef, useEffect } from "react";
import {
  useDownloadExcel,
} from "react-export-table-to-excel";

import {
  FaPlus,
  FaRegEdit,
  FaRegFileExcel,
  FaRegFilePdf,
  FaUser,
} from "react-icons/fa";

import {
  MdDeleteForever,
  MdRefresh,
  MdAirplanemodeActive,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdBreakfastDining,
  MdCall,
  MdChildFriendly,
  MdLocalCafe,
  MdLocalTaxi,
  MdOutlineWifi,
  MdPool,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const Rooms = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let AdminKey = sessionStorage.getItem("Admin");
    if (!AdminKey) {
      navigate("/admin/login");
    }

  })
  const [Adults, setAdults] = useState();
  const [Children, setChildren] = useState();
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Rooms table",
    sheet: "Rooms",
  });
  let Rooms = [
    {
      id: 1,
      roomNumber: 101,
      roomType: "Single",
      facility: "Free Wi-Fi, AC",
      adults: 2,
      children: 0,
      price: "$50",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      roomNumber: 102,
      roomType: "Double",
      facility: "Free Wi-Fi, AC, TV",
      adults: 2,
      children: 1,
      price: "$70",
      booked: "No",
      actions: ["Edit", "Delete"],
    },
    {
      id: 3,
      roomNumber: 103,
      roomType: "Suite",
      facility: "Free Wi-Fi, AC, TV, Mini Bar",
      adults: 4,
      children: 2,
      price: "$150",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 4,
      roomNumber: 104,
      roomType: "Single",
      facility: "Free Wi-Fi",
      adults: 1,
      children: 0,
      price: "$40",
      booked: "No",
      actions: ["Edit", "Delete"],
    },
    {
      id: 5,
      roomNumber: 105,
      roomType: "Double",
      facility: "Free Wi-Fi, AC",
      adults: 2,
      children: 1,
      price: "$80",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 6,
      roomNumber: 106,
      roomType: "Suite",
      facility: "Free Wi-Fi, AC, TV, Mini Bar, Balcony",
      adults: 4,
      children: 3,
      price: "$200",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 7,
      roomNumber: 107,
      roomType: "Double",
      facility: "Free Wi-Fi, AC",
      adults: 2,
      children: 0,
      price: "$75",
      booked: "No",
      actions: ["Edit", "Delete"],
    },
    {
      id: 8,
      roomNumber: 108,
      roomType: "Single",
      facility: "Free Wi-Fi, AC",
      adults: 1,
      children: 0,
      price: "$45",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 9,
      roomNumber: 109,
      roomType: "Suite",
      facility: "Free Wi-Fi, AC, TV, Mini Bar, Jacuzzi",
      adults: 3,
      children: 1,
      price: "$180",
      booked: "Yes",
      actions: ["Edit", "Delete"],
    },
    {
      id: 10,
      roomNumber: 110,
      roomType: "Double",
      facility: "Free Wi-Fi, TV",
      adults: 2,
      children: 0,
      price: "$65",
      booked: "No",
      actions: ["Edit", "Delete"],
    },
  ];

  return (
    <div className="   bg-gray-300/20 p-6  w-full  h-auto flex flex-col  font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="bg-white flex flex-col gap-4 p-4 w-[70vw]">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Rooms Details</h1>
            <div className="relative    flex">
              <div className="flex justify-between gap-2 items-center px-3  py-3 ">
                <FaRegFileExcel className="text-xl text-purple-600" />{" "}
                <button
                  onClick={onDownload}
                  className="hover:text-purple-600 font-semibold text-md"
                >
                  {" "}
                  Export Data{" "}
                </button>
              </div>
              <div className="flex justify-between gap-2 items-center px-3  py-3 ">
                <FaPlus className="text-xl text-purple-600" />{" "}
                <Link to={"/admin/AddRoom"}>
                  <button
                    onClick={() => setPopUpRooms(true)}
                    className="hover:text-purple-600 font-semibold text-md"
                  >
                    {" "}
                    Add Rooms{" "}
                  </button>
                </Link>
              </div>
              <div className="flex justify-between gap-2 items-center px-3  py-3 ">
                <MdRefresh className="text-2xl cursor-pointer text-purple-600 font-semibold " />{" "}
              </div>
            </div>
          </div>

          <div className="relative ">
            <table
              ref={tableRef}
              className="w-full text-sm text-left rtl:text-right overflow-scroll "
            >
              <thead className=" w-full ">
                <tr>
                  <td className="px-3 py-4">#</td>
                  <th scope="col" className="px-3 py-3">
                    Room Number
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Room Type
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Facility
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Adults
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Children
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Booked
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" w-full">
                {Rooms.map((items, index) => {
                  const {
                    roomNumber,
                    roomType,
                    facility,
                    adults,
                    children,
                    price,
                    booked,
                    actions,
                    id,
                  } = items;
                  return (
                    <tr className="" key={id}>
                      <td className="px-3 py-4">{index + 1}</td>

                      <td className="px-3 py-4 flex items-center gap-2">
                        {" "}
                        {roomNumber}
                      </td>
                      <td className="px-3 py-4 ">{roomType}</td>
                      <td className="px-3 py-4">{facility}</td>
                      <td className="px-3 py-4">{adults}</td>
                      <td className="px-3 py-4">{children}</td>
                      <td className="px-3 py-4">{price}</td>
                      <td className="px-3 py-4">
                        <p>{booked}</p>
                      </td>
                      <td className="px-3 py-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
