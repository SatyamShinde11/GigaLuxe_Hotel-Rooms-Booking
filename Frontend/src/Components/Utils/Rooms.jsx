import React, { useContext, useState } from 'react'
import { MdAirplanemodeActive, MdArrowRightAlt, MdBreakfastDining, MdCall, MdLocalCafe, MdLocalTaxi, MdOutlineWifi, MdPool } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { HotelDataContext } from '../../Context/HotelData.jsx';

const Rooms = ({ description, features, img, price, title, type, _id }) => {
  const { response, setResponse } = useContext(HotelDataContext);
  console.log(response);

  const featureData = [
    { label: "Pool", icon: <MdPool /> },
    { label: "Call", icon: <MdCall /> },
    { label: "Taxi", icon: <MdLocalTaxi /> },
    { label: "Cafe", icon: <MdLocalCafe /> },
    { label: "Wifi", icon: <MdOutlineWifi /> },
    { label: "Breakfast", icon: <MdBreakfastDining /> },
    { label: "Airplane", icon: <MdAirplanemodeActive /> },
  ];

  return (
    <div className='border rounded-xl p-5 w-full  md:w-[30vw]  flex flex-col gap-4 relative bg-white  '>
      <div className='relative group flex items-center'>
        <img src={img} alt="" className="w-full h-96 rounded-lg" />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <Link to={`/RoomPreview?RoomId=${_id}`} state={_id} >
            <a className='text-6xl text-white'><MdArrowRightAlt /></a>
          </Link>
        </div>

        <p className=' font-serif absolute z-10 bottom-0 px-3 right-0 bg-black/50 text-white font-extrabold p-1 rounded-md  opacity-0 group-hover:opacity-100 transform duration-300 transition-all'>
          {type}
        </p>
      </div>
      <h2 className='font-Ubuntu text-xl'>{title}</h2>
      <p className='text-md '>{description}</p>
      <div className='flex gap-3'>
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
      <p className='text-lg'>Price: ₹{price}/day  </p>
    </div >
  )
}


export default Rooms