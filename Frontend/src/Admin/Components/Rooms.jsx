import React, { useState, useRef, useEffect } from "react";
import Image from "../assets/room.jpg";
import { useDownloadExcel } from "react-export-table-to-excel";

import {
  FaPlus,
  FaRegEdit,
  FaRegFileExcel,
  FaRegFilePdf,
  FaThList,
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
  MdSpaceDashboard,
  MdViewList,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Rooms = () => {
  const featureData = [
    { label: "Pool", icon: <MdPool /> },
    { label: "Call", icon: <MdCall /> },
    { label: "Taxi", icon: <MdLocalTaxi /> },
    { label: "Cafe", icon: <MdLocalCafe /> },
    { label: "Wifi", icon: <MdOutlineWifi /> },
    { label: "Breakfast", icon: <MdBreakfastDining /> },
    { label: "Airplane", icon: <MdAirplanemodeActive /> },
  ];

  const [Rooms, setRooms] = useState([])
  const navigate = useNavigate();
  const [changeRoomsStyle, setChangeRoomsStyle] = useState(false);
  const [man, setman] = useState();
  const [kids, setkids] = useState();
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [OpenEditPopUp, setOpenEditPopUp] = useState(false)

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === "All" ? Rooms.length : parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(Rooms.length / itemsPerPage);
  const currentData = Rooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Rooms table",
    sheet: "Rooms",
  });


  const FetchRoomData = async () => {
    try {
      await axios.get("http://localhost/api/v1/room/getRooms").then((res) => {
        console.log(res.data.rooms);
        setRooms(res.data.rooms)
      }).catch((err) => {
        console.log(err);

      })
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    FetchRoomData();
  }, []);

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
                {changeRoomsStyle ? (<MdViewList
                  onClick={() => setChangeRoomsStyle(false)}
                  className="text-2xl text-purple-600 cursor-pointer  "
                />

                ) : (
                  <MdSpaceDashboard
                    onClick={() => setChangeRoomsStyle(true)}
                    className="text-2xl text-purple-600 cursor-pointer  "
                  />
                )}
              </div>
              <div className="flex justify-between gap-2 items-center px-3  py-3 ">
                <MdRefresh className="text-2xl cursor-pointer text-purple-600 font-semibold " />{" "}
              </div>
            </div>
          </div>
          <div className="relative">
            {changeRoomsStyle ? (
              <div className=" w-full flex justify-evenly gap-5   flex-wrap  ">
                {/* console.log(Rooms); */}

                {" "}
                {Rooms.map((items, index) => {
                  const {
                    roomNumber,
                    roomType,
                    name,
                    bedType,
                    description,
                    man,
                    kids,
                    price,
                    isBooked,
                    roomSize,
                    roomLocation,
                    roomFlour, features,
                    _id,
                  } = items;
                  console.log(items);

                  return (
                    <div className="w-[28vw] flex flex-col gap-6 p-5 rounded-lg border bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div>
                        <img
                          src={Image}
                          alt="Room Image"
                          className="w-full h-56 object-cover rounded-lg"
                        />
                      </div>

                      <div className="room-details flex flex-col gap-4">
                        <h2 className="room-name text-2xl font-semibold text-gray-800">
                          {name}
                        </h2>

                        <p className="text-gray-700">
                          <b>description:</b> {description}
                        </p>

                        <p className="text-gray-700">
                          <b>Status:</b>{" "}
                          <span className="text-green-500 font-medium">
                            {isBooked ? "Booked" : " Not Booked"}
                          </span>
                        </p>

                        <div className="flex gap-3">
                          <p>
                            <b>Features:</b>
                          </p>
                          <ul className="feature-list flex gap-4">
                            {features.map((feature, index) => {
                              const featureMatch = featureData.find(
                                (item) => item.label === feature
                              );

                              if (!featureMatch) return null;

                              return (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-xl flex-wrap text-gray-600"
                                >
                                  {featureMatch.icon}
                                </li>
                              );
                            })}

                          </ul>
                        </div>

                        {/* Price */}
                        <p className="text-gray-700">
                          <b>Price:</b>{" "}
                          <span className="price text-xl font-bold">${price}</span>{" "}
                          per night
                        </p>

                        {/* Room Details */}
                        <p className="text-gray-700">
                          <b>Bed Type:</b> {bedType}
                        </p>
                        <p className="text-gray-700">
                          <b>Room Type:</b> {roomType}
                        </p>
                        <p className="text-gray-700">
                          <b>Room Size:</b> {roomSize}
                        </p>
                        <p className="text-gray-700">
                          <b>Room Location:</b> {roomLocation}
                        </p>
                        <p className="text-gray-700">
                          <b>Room Number:</b> 101
                        </p>
                        <p className="text-gray-700">
                          <b>Room Floor:</b> {roomFlour}
                        </p>
                        <p className="text-gray-700">
                          <b>Max Adults:</b> {man}
                        </p>
                        <p className="text-gray-700">
                          <b>Max Kids:</b> {kids}
                        </p>
                      </div>

                      {/* Action Buttons Section */}
                      <div className="flex justify-between gap-4 mt-4">
                        <Link
                          to="/admin/EditRoom"
                          state={{
                            name,
                            description,
                            bedType,
                            roomNumber,
                            roomType,
                            adults: man,
                            children: kids,
                            price,
                            booked: isBooked,
                            id: _id,
                            size: roomSize,
                            location: roomLocation,
                            floor: roomFlour,
                            features,
                          }}
                          className="flex items-center justify-center gap-3 w-1/2 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-shadow duration-200"
                        >   <FaRegEdit className="text-xl" /> </Link>


                        <button className="flex items-center justify-center gap-3 w-1/2 py-2 bg-red-600 text-white font-semibold rounded-lg hover:shadow-xl transition-shadow duration-200">
                          <MdDeleteForever className="text-2xl" />
                          <p>Delete</p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="container mx-auto p-4">
                <p className="flex items-center gap-4 mb-3 text-gray-700 text-sm font-medium">
                  Per Page View
                  <div className="flex justify-center items-center bg-purple-500 rounded-md gap-2 overflow-hidden text-white font-semibold">
                    <select
                      id="itemsPerPage"
                      onChange={handleItemsPerPageChange}
                      className="border border-gray-300 rounded-md bg-white py-1 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">25</option>
                      <option value="20">50</option>
                      <option value="20">75</option>
                      <option value="All">All</option>
                    </select>

                  </div>

                </p> <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right overflow-scroll">
                    <thead className="w-full bg-gray-100">
                      <tr>
                        <td className="px-3 py-4">#</td>
                        <th scope="col" className="px-3 py-3">
                          Room Number
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Room Type
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Rooms Flour
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
                    <tbody className="w-full">
                      {currentData.map((items, index) => {
                        const {
                          roomNumber,
                          roomType,
                          name,
                          bedType,
                          description,
                          man,
                          kids,
                          price,
                          isBooked,
                          actions,
                          roomSize,
                          roomLocation,
                          roomFlour, features,
                          _id,
                        } = items;

                        return (
                          <tr key={_id} className="hover:bg-gray-100">
                            <td className="px-3 py-4">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-3 py-4 flex items-center gap-2">
                              {roomNumber}
                            </td>
                            <td className="px-3 py-4">{roomType}</td>
                            <td className="px-3 py-4">{roomFlour || "1"}</td>
                            <td className="px-3 py-4">{man}</td>
                            <td className="px-3 py-4">{kids}</td>
                            <td className="px-3 py-4">${price}</td>
                            <td className="px-3 py-4">{isBooked ? "yes" : "no"}</td>
                            <td className="px-3 py-4">
                              <div className="flex items-center justify-between">
                                <Link
                                  to="/admin/EditRoom"
                                  state={{
                                    name,
                                    description,
                                    bedType,
                                    roomNumber,
                                    roomType,
                                    adults: man,
                                    children: kids,
                                    price,
                                    booked: isBooked,
                                    id: _id,
                                    size: roomSize,
                                    location: roomLocation,
                                    floor: roomFlour,
                                    features,
                                  }}
                                >
                                  <FaRegEdit className="text-xl text-purple-600 font-semibold cursor-pointer" />
                                </Link>
                                <MdDeleteForever className="text-2xl cursor-pointer font-semibold text-red-600" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  <nav
                    className="inline-flex rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3  py-2 w-[6vw] text-sm font-medium text-white bg-purple-600 border border-gray-300 rounded-l-md hover:bg-purple-500 ${currentPage === 1 && "cursor-not-allowed opacity-50"
                        }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3   py-2 text-sm font-medium border ${currentPage === i + 1
                          ? "text-white bg-purple-500 border-purple-500"
                          : "text-gray-500 bg-white border-gray-300"
                          } hover:bg-purple-100 hover:text-purple-500 `}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 w-[6vw] text-sm font-medium text-white bg-purple-600 border border-gray-300 rounded-r-md hover:bg-purple-500 ${currentPage === totalPages &&
                        "cursor-not-allowed opacity-50"
                        }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
