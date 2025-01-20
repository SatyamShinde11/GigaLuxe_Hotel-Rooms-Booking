import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RoomBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const roomData = location.state || {};

    let CheckIn = roomData[2]?.BookingDates?.[0]?.toLocaleString()?.split(",")[0] || "N/A";
    let CheckOut = roomData[2]?.BookingDates?.[1]?.toLocaleString()?.split(",")[0] || "N/A";

    const [RoomsData, setRoomsData] = useState({
        name: roomData[0]?.name || "N/A",
        description: roomData[0]?.description || "No description provided.",
        price: Number(roomData[0]?.price) || 0,
        man: Number(roomData[0]?.man) || 0,
        kids: Number(roomData[0]?.kids) || 0,
        bedType: roomData[0]?.bedType || "N/A",
        features: roomData[0]?.features || [],
        isBooked: roomData[0]?.isBooked || false,
        roomType: roomData[0]?.roomType || "N/A",
        roomSize: roomData[0]?.roomSize || "N/A",
        roomFlour: roomData[0]?.roomFlour || "N/A",
        roomNumber: roomData[0]?.roomNumber || "N/A",
        roomLocation: roomData[0]?.roomLocation || "N/A",
        id: roomData[0]?.id || "",
        mainRoomImage: roomData.mainRoomImage || "",
        roomImages: roomData.roomImages || [],
    });

    const TotalPrice = (RoomsData.price + RoomsData.price * 0.1).toFixed(2);

    const Token = localStorage.getItem("AuthToken");

    const handelRoomBooking = async () => {
        for (let element of roomData[0]?.BookingDate || []) {
            if (element.CheckIn === CheckIn) {
                toast.error("Already booked, please select another date.");
                return;
            }
        }
        if (!RoomsData.id) {
            console.log("Room ID is required");
            return;
        }

        if (!Token) {
            toast.error("User is not authenticated");
            return navigate("/SignUp");
        }

        const token = Token.split("+");
        const data = {
            roomId: RoomsData.id,
            TotalPrice,
            CheckIn,
            CheckOut,
        };

        try {
            await axios.post(
                "http://localhost/api/v1/room/createBooking",
                { data },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token[1]}`,
                    },
                }
            ).then((response) => {
                toast.success(response.data.message || "Room Booked Successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Room booking failed.");
        }
    };

    useEffect(() => {
        const VerifyToken = localStorage.getItem("AuthToken");
        if (!VerifyToken) {
            return navigate("/SignUp");
        }
    }, [navigate]);

    return (
        <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-4 items-start font-Poppins overflow-hidden">
            <h1 className="text-lg md:text-xl font-extrabold">Cart</h1>

            <div className="relative w-full bg-white rounded-md overflow-x-auto">
                <table className="text-left w-full">
                    <thead className="font-extrabold text-sm md:text-md uppercase text-white bg-purple-600 border border-purple-600">
                        <tr className="text-center">
                            <th scope="col" className="px-2 md:px-3 py-3">Room</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Bed Type</th>
                            <th scope="col" className="px-2 md:px-3 py-3">CheckIn to CheckOut</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Capacity</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Night</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Quantity</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Gross Total</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Cancel Room</th>
                        </tr>
                    </thead>
                    <tbody className="border text-sm md:text-md border-purple-600 font-semibold">
                        <tr className="text-center">
                            <td className="px-2 md:px-3 py-3">{RoomsData.roomType}</td>
                            <td className="px-2 md:px-3 py-3">{RoomsData.bedType}</td>
                            <td className="px-4 md:px-6 py-4">{CheckIn} to {CheckOut}</td>
                            <td className="px-4 md:px-6 py-4">{RoomsData.kids + RoomsData.man}</td>
                            <td className="px-4 md:px-6 py-4">4</td>
                            <td className="px-2 md:px-3 py-3">1</td>
                            <td className="px-2 md:px-3 py-3">${RoomsData.price.toFixed(2)}</td>
                            <td className="px-2 md:px-3 py-3"><a className="text-purple-600 cursor-pointer">Cancel</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col mt-4 w-full">
                <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-t border-x border-purple-600 p-2">
                    <p>Sub Total</p><span>₹{RoomsData.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2">
                    <p>Tax</p><span>10%</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2">
                    <p>Total</p><span>₹{TotalPrice}</span>
                </div>
            </div>

            <button
                onClick={handelRoomBooking}
                className="px-4 md:px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-sm md:text-lg text-white rounded-lg font-medium flex items-center justify-center"
            >
                Check Out
            </button>
        </div>
    );
};

export default RoomBooking;
