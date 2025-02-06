import React, { useContext, useEffect, useState } from 'react';
import { HotelDataContext } from '../Context/HotelData.jsx';
import {
    MdAirplanemodeActive,
    MdBreakfastDining,
    MdCall,
    MdChildFriendly,
    MdLocalCafe,
    MdLocalTaxi,
    MdOutlineWifi,
    MdPool,
} from 'react-icons/md';
import Button from '../Components/Utils/Button';
import { Link, useNavigate } from 'react-router-dom';

const featureData = [
    { label: "Pool", icon: <MdPool /> },
    { label: "Call", icon: <MdCall /> },
    { label: "Taxi", icon: <MdLocalTaxi /> },
    { label: "Cafe", icon: <MdLocalCafe /> },
    { label: "Wifi", icon: <MdOutlineWifi /> },
    { label: "Breakfast", icon: <MdBreakfastDining /> },
    { label: "Airplane", icon: <MdAirplanemodeActive /> },
];

const AllRooms = () => {
    const navigate = useNavigate();
    const { response } = useContext(HotelDataContext);
    const [filterValue, setFilterValue] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([...response || []]);

    useEffect(() => {
        const VerifyToken = localStorage.getItem("AuthToken");
        if (!VerifyToken) {
            navigate("/SignUp");
        }
    }, [navigate]);

    useEffect(() => {
        if (!filterValue.trim()) {
            setFilteredRooms(response || []);
            return;
        }

        const searchValue = filterValue.toLowerCase();

        const filtered = response?.filter((room) => {
            return (
                room.name.toLowerCase().includes(searchValue) ||
                room.price.toString().includes(searchValue) ||
                room.bedType?.toLowerCase().includes(searchValue) ||
                room.kids.toString().includes(searchValue) ||
                room.man.toString().includes(searchValue) ||
                room.roomFlour?.toString().includes(searchValue) ||
                room.roomType?.toLowerCase().includes(searchValue) ||
                room.description?.toLowerCase().includes(searchValue) ||
                room.features.some((feature) =>
                    feature.toLowerCase().includes(searchValue)
                )
            );
        });

        setFilteredRooms(filtered);
    }, [filterValue, response]);

    return (
        <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-3xl font-extrabold">All Rooms</h1>
                    <div className="flex gap-5 items-center justify-center">
                        <input
                            type="text"
                            className="border rounded-md px-2 py-1 border-purple-600 outline-none"
                            placeholder="Search"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                        <button className="border rounded-md px-2 py-1 bg-purple-600 cursor-pointer text-white hover:bg-purple-500">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:px-20 flex flex-wrap lg:gap-12 gap-9 md:gap-0 justify-evenly">
                {filteredRooms.map((items) => {
                    const {
                        bedType,
                        description,
                        features,
                        isBooked,
                        isBookingDate,
                        kids,
                        mainRoomImage,
                        man,
                        name,
                        price,
                        roomFlour,
                        roomImages,
                        roomLocation,
                        roomNumber,
                        roomSize,
                        roomType,
                        _id,
                    } = items;

                    return (
                        <div key={_id} className="flex lg:w-[25vw] md:w-1/2 flex-col gap-5 p-3 border rounded-xl bg-white">
                            <img src={mainRoomImage} alt="" className="rounded-xl" />
                            <div className="p-2 flex flex-col gap-4 font-semibold items-start">
                                <p className="text-purple-600 text-sm">Type: {roomType}</p>
                                <h1 className="md:text-xl text-md">Title: {name}</h1>
                                <p className="text-md">Description: {description}</p>
                                <div className="flex items-center gap-3 text-xl">
                                    Features:{' '}
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
                                </div>
                                <div className="text-xl flex gap-5">
                                    <p>Adults: {man}</p>
                                    <p>Children: {kids}</p>
                                </div>
                                <p className="text-xl font-extrabold">Price ₹{price}/day</p>
                                <Link to={`/RoomPreview?RoomId=${_id}`} state={_id}>
                                    <Button text={"Room Preview"} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllRooms;
