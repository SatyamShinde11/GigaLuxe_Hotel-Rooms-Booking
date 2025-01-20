import React, { useEffect, useState } from "react";
import {
    MdAirplanemodeActive,
    MdCall,
    MdLocalCafe,
    MdLocalTaxi,
    MdOutlineWifi,
    MdPool,
    MdBreakfastDining,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const EditRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const roomData = location.state || {};

    const [EditRoomsData, setEditRoomsData] = useState({
        name: roomData.name || "",
        description: roomData.description || "",
        price: roomData.price || "",
        man: roomData.adults || 0,
        kids: roomData.children || 0,
        bedType: roomData.bedType || "",
        features: roomData.features || [],
        isBooked: roomData.booked || false,
        roomType: roomData.roomType || "",
        roomSize: roomData.size || "",
        roomFlour: roomData.floor || "",
        roomNumber: roomData.roomNumber || "",
        roomLocation: roomData.location || "",
        id: roomData.id || "",
    });

    const featureData = [
        { label: "Pool", icon: <MdPool /> },
        { label: "Call", icon: <MdCall /> },
        { label: "Taxi", icon: <MdLocalTaxi /> },
        { label: "Cafe", icon: <MdLocalCafe /> },
        { label: "Wifi", icon: <MdOutlineWifi /> },
        { label: "Breakfast", icon: <MdBreakfastDining /> },
        { label: "Airplane", icon: <MdAirplanemodeActive /> },
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditRoomsData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (feature) => {
        setEditRoomsData((prev) => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
        }));
    };

    const EditRoomData = async () => {
        try {
            if (!EditRoomsData.id) {
                toast.error("Room ID is required");
                return;
            }

            const response = await axios.post(
                "http://localhost/api/v1/room/editRoom",
                { Data: EditRoomsData }
            );
            toast.success("Room Updated Successfully");

            setEditRoomsData({
                name: "",
                description: "",
                price: "",
                man: 0,
                kids: 0,
                bedType: "",
                features: [],
                isBooked: false,
                roomType: "",
                roomSize: "",
                roomFlour: "",
                roomNumber: "",
                roomLocation: "",
                id: "",
            });
            navigate("/admin/Rooms")
        } catch (error) {
            toast.error("Failed to update room");
            console.error(error);
        }
    };


    return (
        <div className="bg-gray-300/20 p-6 w-full h-auto flex flex-col font-Poppins overflow-hidden">
            <div className="w-[70vw] bg-white/90 flex flex-col gap-7 p-6 rounded-2xl">
                <h1 className="font-semibold">Edit Room</h1>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="text"
                        name="name"
                        value={EditRoomsData.name}
                        onChange={handleChange}
                        placeholder="Room Title*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                    <input
                        type="text"
                        name="description"
                        value={EditRoomsData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                </div>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="text"
                        name="bedType"
                        value={EditRoomsData.bedType}
                        onChange={handleChange}
                        placeholder="Bed Type*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                    <input
                        type="text"
                        name="roomLocation"
                        value={EditRoomsData.roomLocation}
                        onChange={handleChange}
                        placeholder="Room Location*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                </div>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="text"
                        name="roomSize"
                        value={EditRoomsData.roomSize}
                        onChange={handleChange}
                        placeholder="Room Size*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                    <select
                        name="roomType"
                        value={EditRoomsData.roomType}
                        onChange={handleChange}
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    >
                        <option value="">Room Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Suite">Suite</option>
                    </select>
                </div>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="number"
                        name="man"
                        value={EditRoomsData.man}
                        onChange={handleChange}
                        placeholder="Man*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                    <input
                        type="number"
                        name="kids"
                        value={EditRoomsData.kids}
                        onChange={handleChange}
                        placeholder="Kids"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                </div>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="text"
                        name="roomNumber"
                        value={EditRoomsData.roomNumber}
                        onChange={handleChange}
                        placeholder="Room Number*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                    <input
                        type="text"
                        name="roomFlour"
                        value={EditRoomsData.roomFlour}
                        onChange={handleChange}
                        placeholder="Room Floor*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                </div>
                <div className="flex justify-evenly gap-8">
                    <input
                        type="number"
                        name="price"
                        value={EditRoomsData.price}
                        onChange={handleChange}
                        placeholder="Room Price*"
                        className="w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70"
                    />
                </div>
                <div className="flex justify-evenly gap-8 text-xl">
                    <p>Features</p>
                    {featureData.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-2xl">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(feature.label)}
                                checked={EditRoomsData.features.includes(feature.label)}
                                className="cursor-pointer"
                            />
                            {feature.icon}
                        </div>
                    ))}
                </div>

                <div className="flex justify-evenly gap-8">
                    <button
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium"
                        onClick={EditRoomData}
                    >
                        Submit
                    </button>
                    <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;
