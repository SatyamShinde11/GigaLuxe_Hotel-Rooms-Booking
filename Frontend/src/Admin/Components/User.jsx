import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRegFileExcel } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useDownloadExcel } from "react-export-table-to-excel";

const User = () => {
  const [userData, setUserData] = useState([]);
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users_table",
    sheet: "Users",
  });

  const FetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost/api/v1/user/getUser");
      if (response.data && response.data.userData) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <div className="w-full h-auto mt-20 flex flex-col font-Poppins overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="bg-white relative flex flex-col gap-4 p-4 w-[70vw]">
          <div className="flex items-center flex-wrap gap-5 md:gap-0 justify-center md:justify-between">
            <h1 className="font-semibold">User Details</h1>
            <div className="flex gap-4">
              <button onClick={onDownload} className="flex items-center gap-2 text-purple-600 font-semibold">
                <FaRegFileExcel className="text-xl" /> Export Data
              </button>
              <MdRefresh className="cursor-pointer text-2xl text-purple-600" onClick={FetchUserData} />
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table ref={tableRef} className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border">#</th>
                  <th className="px-4 py-3 border">Name</th>
                  <th className="px-4 py-3 border">Email</th>
                  <th className="px-4 py-3 border">Phone</th>
                  <th className="px-4 py-3 border">Location</th>
                  <th className="px-4 py-3 border">Booked Rooms</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={user._id} className="border">
                    <td className="px-4 py-4 border">{index + 1}</td>
                    <td className="px-4 py-4 border">{user.name}</td>
                    <td className="px-4 py-4 border">{user.email}</td>
                    <td className="px-4 py-4 border">{user.phoneNumber}</td>
                    <td className="px-4 py-4 border">{user.location}</td>
                    <td className="px-4 py-4 border">
                      {user.BookedRooms.length > 0 ? (
                        user.BookedRooms.map((room, roomIndex) => (
                          <span  key={roomIndex} className="block mb-1 ">{room.RoomId}</span>
                        ))
                      ) : (
                        "No rooms booked"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default User;
