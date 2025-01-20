import React, { useContext, useEffect } from 'react'
import { HotelDataContext } from '../Context/HotelData.jsx';
import RoomsFilter from '../Components/Utils/RoomsFilter'
import Room from "../assets/room.jpg";
import {
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

    let roomData = [...response || []]
    console.log(roomData);
    
 useEffect(() => {
        const VerifyToken = localStorage.getItem("AuthToken");
        console.log(VerifyToken);
    
        if (!VerifyToken) {
          return navigate("/SignUp")
        }
      }, []);
  
    return (
        <div className='mt-20 w-full flex flex-wrap gap-10 '>
            <div className='w-full flex justify-center items-center '>

                <RoomsFilter />
            </div>
            <div className='lg:px-20 flex flex-wrap lg:gap-12 gap-9 md:gap-0 justify-evenly'>
                {
                    roomData.map((items, index) => {
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
                        } = items

                        //    
                        return (
                            <div key={_id} className='flex lg:w-[25vw] md:w-1/2 flex-col gap-5 p-3 border rounded-xl bg-white '>
                                <img src={mainRoomImage} alt="" className=' rounded-xl' />
                                <div className=' p-2 flex flex-col gap-4 font-semibold items-start'>
                                    <p className='text-purple-600 text-sm '>Type: {roomType}</p>
                                    <h1 className='md:text-xl text-md '>Title: {name}</h1>
                                    <p className=' text-md 
                                    '>Description: {description}</p>
                                    <div className='flex items-center gap-3 text-xl'>Features: {features.map((feature, index) => {
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
                                    })}</div>
                                    <div className='text-xl flex gap-5'>
                                        <p>Adults:{man}</p>
                                        <p>Children:{kids}</p>
                                    </div>
                                    <p className='text-xl font-extrabold'>Price ₹{price}/day</p>
                                    <Link to={`/RoomPreview?RoomId=${_id}`} state={{ ...items, _id }}>
                                        <Button text={"Room Preview"} />
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default AllRooms