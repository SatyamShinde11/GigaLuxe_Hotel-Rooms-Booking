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

import { MdDeleteForever, MdRefresh } from "react-icons/md";
import axios from "axios";
const User = () => {
  const [userData, setUserData] = useState([])
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  // let userData = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     phone: "+91 9123456789",
  //     checkIn: "2024-01-10",
  //     checkOut: "2024-01-15",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "janesmith@example.com",
  //     phone: "+91 9876543210",
  //     checkIn: "2024-01-12",
  //     checkOut: "2024-01-18",
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Brown",
  //     email: "michaelbrown@example.com",
  //     phone: "+91 9345678901",
  //     checkIn: "2024-01-14",
  //     checkOut: "2024-01-20",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Davis",
  //     email: "emilydavis@example.com",
  //     phone: "+91 9234567810",
  //     checkIn: "2024-01-16",
  //     checkOut: "2024-01-22",
  //   },
  //   {
  //     id: 5,
  //     name: "Christopher White",
  //     email: "christopherwhite@example.com",
  //     phone: "+91 9456781234",
  //     checkIn: "2024-01-18",
  //     checkOut: "2024-01-24",
  //   },
  //   {
  //     id: 6,
  //     name: "Jessica Green",
  //     email: "jessicagreen@example.com",
  //     phone: "+91 9567812345",
  //     checkIn: "2024-01-20",
  //     checkOut: "2024-01-25",
  //   },
  //   {
  //     id: 7,
  //     name: "David Wilson",
  //     email: "davidwilson@example.com",
  //     phone: "+91 9678912345",
  //     checkIn: "2024-01-22",
  //     checkOut: "2024-01-28",
  //   },
  //   {
  //     id: 8,
  //     name: "Sophia Harris",
  //     email: "sophiaharris@example.com",
  //     phone: "+91 9789123456",
  //     checkIn: "2024-01-24",
  //     checkOut: "2024-01-30",
  //   },
  //   {
  //     id: 9,
  //     name: "Daniel Johnson",
  //     email: "danieljohnson@example.com",
  //     phone: "+91 9891234567",
  //     checkIn: "2024-01-26",
  //     checkOut: "2024-02-01",
  //   },
  //   {
  //     id: 10,
  //     name: "Olivia Martinez",
  //     email: "oliviamartinez@example.com",
  //     phone: "+91 9901234568",
  //     checkIn: "2024-01-28",
  //     checkOut: "2024-02-03",
  //   },
  // ];

  const FetchUserData = async () => {
    try {
      // http://localhost/api/v1/user/getUser

      await axios.get("http://localhost/api/v1/user/getUser").then((res) => {
        console.log(res.data.userData);
        setUserData(res.data.userData)
      }).catch((err) => {
        console.log(err);
      })

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    FetchUserData()
  }, [])

  return (
    <div className="   bg-gray-300/20 p-6  w-full  h-auto flex flex-col  font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="bg-white flex flex-col gap-4 p-4 w-[70vw]">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">User Details</h1>
            <div className="relative    flex">
              {/* <CiMenuKebab
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setPopUp(true);
                }}
              /> */}

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
                <MdRefresh className=" cursor-pointer text-2xl text-purple-600 font-semibold " />{" "}
              </div>

            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table
              ref={tableRef}
              className="w-full text-sm text-left rtl:text-right overflow-scroll "
            >
              {" "}
              <thead className=" w-full bg-gray-100">
                <tr>
                  <td className="px-4 border border-gray-100  py-4">#</td>
                  <th scope="col" className="px-4 border border-gray-100 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 border border-gray-100 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 border border-gray-100 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-4 border border-gray-100 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-4 border border-gray-100 py-3">
                  BookedRooms
                  </th>
                </tr>
              </thead>
              <tbody className=" w-full">
                {userData.map((items, index) => {
                  const { email, name, phoneNumber, location, BookedRooms, _id } = items;
                  return (
                    <tr className="" key={index}>
                      <td className="px-4 border border-gray-100 py-4">
                        {index + 1}
                        {/* <FaUser className="text-2xl rounded-full" /> */}
                      </td>

                      <td className="px-4 border border-gray-100 py-4 flex items-center gap-2">
                        {name}
                      </td>
                      <td className="px-4 border border-gray-100 py-4">{email}</td>
                      <td className="px-4 border border-gray-100 py-4">{phoneNumber}</td>
                      <td className="px-4 border border-gray-100 py-4 ">{location}</td>
                      <td className="px-4 border border-gray-100 py-4">{BookedRooms}</td>
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

export default User;
