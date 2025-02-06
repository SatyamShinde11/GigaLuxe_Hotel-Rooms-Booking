import axios from "axios";
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
const [bookingData, setBookingData] = useState([])
  const GetAllBooking = async()=>{
    try {
      await axios.get("http://localhost/api/v1/room/getBookings").then((res)=>{
        console.log(res.data.data);
        setBookingData(res.data.data)
      })
    } catch (error) {
  
    }
      }
      useEffect(() => {
        GetAllBooking()
  
      }, [])

  const navigate = useNavigate();
  console.log(bookingData);
let BookingData = bookingData ||[]
 
  return (
    <table className="  text-sm text-left rtl:text-right overflow-scroll ">
      <thead className=" w-full ">
        <tr>
          <td className="px-4 py-4 text-nowrap">#</td>
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
            Price
          </th>

          <th scope="col" className="px-4 py-3">
            Phone
          </th>
          <th scope="col" className="px-4 py-3">
            Room Id
          </th>
          <th scope="col" className="px-4 py-3">
            User Id
          </th>
          {/* <th scope="col" className="px-4 py-3">
            Invoice
          </th>
          <th scope="col" className="px-4 py-3">
            Actions
          </th> */}
        </tr>
      </thead>
      <tbody className=" w-full">
        {BookingData.map((items, index) => {
          const {
            name,
            CheckIn,
            CheckOut,
            Price,
            Room,
            User,
            id,
          } = items;
          return (
            <tr className="" key={index}>
              <td className="px-4 py-4 text-nowrap">{index + 1}</td>

              <td className="px-4 py-4 text-nowrap flex items-center gap-2">
                <FaUser className="text-2xl  rounded-full" />
                {User?.name}
              </td>
              <td className="px-4 py-4 text-nowrap ">{CheckIn}</td>
              <td className="px-4 py-4 text-nowrap">{CheckOut}</td>
              <td className="px-4 py-4 text-nowrap">

                {Price}
              </td>

              <td className="px-4 py-4 text-nowrap">{User?.phoneNumber}</td>
              <td className="px-4 py-4 text-nowrap">{Room?._id}</td>
              <td className="px-4 py-4 text-nowrap">{User?._id}</td>
              {/* <td className="px-4 py-4 text-nowrap">
                <FaRegFilePdf className="text-purple-600 text-xl cursor-pointer" />
              </td>
              <td className="px-4 py-4 text-nowrap">
                <div className="flex items-center justify-between">
                  <FaRegEdit className="text-xl text-blue-500 cursor-pointer" />
                  <MdDeleteForever className="text-2xl cursor-pointer text-purple-600 " />
                </div>
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingRooms;
