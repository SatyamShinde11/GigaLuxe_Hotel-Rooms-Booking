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
import { useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let AdminKey = sessionStorage.getItem("Admin");
    if (!AdminKey) {
      navigate("/admin/login");
    }

  })
  const [dates, setDates] = useState(null);
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;
  console.log(dates);

  let minDate = new Date();

  let maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  let userData = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+91 9123456789",
      checkIn: "2024-01-10",
      checkOut: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+91 9876543210",
      checkIn: "2024-01-12",
      checkOut: "2024-01-18",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      phone: "+91 9345678901",
      checkIn: "2024-01-14",
      checkOut: "2024-01-20",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emilydavis@example.com",
      phone: "+91 9234567810",
      checkIn: "2024-01-16",
      checkOut: "2024-01-22",
    },
    {
      id: 5,
      name: "Christopher White",
      email: "christopherwhite@example.com",
      phone: "+91 9456781234",
      checkIn: "2024-01-18",
      checkOut: "2024-01-24",
    },
    {
      id: 6,
      name: "Jessica Green",
      email: "jessicagreen@example.com",
      phone: "+91 9567812345",
      checkIn: "2024-01-20",
      checkOut: "2024-01-25",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "davidwilson@example.com",
      phone: "+91 9678912345",
      checkIn: "2024-01-22",
      checkOut: "2024-01-28",
    },
    {
      id: 8,
      name: "Sophia Harris",
      email: "sophiaharris@example.com",
      phone: "+91 9789123456",
      checkIn: "2024-01-24",
      checkOut: "2024-01-30",
    },
    {
      id: 9,
      name: "Daniel Johnson",
      email: "danieljohnson@example.com",
      phone: "+91 9891234567",
      checkIn: "2024-01-26",
      checkOut: "2024-02-01",
    },
    {
      id: 10,
      name: "Olivia Martinez",
      email: "oliviamartinez@example.com",
      phone: "+91 9901234568",
      checkIn: "2024-01-28",
      checkOut: "2024-02-03",
    },
  ];

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
              <thead className=" w-full ">
                <tr>
                  <td className="px-4 py-4">#</td>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Check In
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Check Out
                  </th>
                </tr>
              </thead>
              <tbody className=" w-full">
                {userData.map((items, index) => {
                  const { email, name, phone, checkIn, checkOut, id } = items;
                  return (
                    <tr className="" key={id}>
                      <td className="px-4 py-4">
                        {index + 1}
                        {/* <FaUser className="text-2xl rounded-full" /> */}
                      </td>

                      <td className="px-4 py-4 flex items-center gap-2">
                        {name}
                      </td>
                      <td className="px-4 py-4">{email}</td>
                      <td className="px-4 py-4">{phone}</td>
                      <td className="px-4 py-4 ">{checkIn}</td>
                      <td className="px-4 py-4">{checkOut}</td>
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
