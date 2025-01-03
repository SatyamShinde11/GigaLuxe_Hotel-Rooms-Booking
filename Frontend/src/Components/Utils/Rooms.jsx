import React, { useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Rooms = ({ description, features, img, price, title, type }) => {
  return (
    <div className='border rounded-xl p-5 w-full  md:w-[30vw]  flex flex-col gap-4 relative bg-white  '>
      <div className='relative group flex items-center'>
        <img src={img} alt="" className="w-full rounded-lg" />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <Link to="/RoomPreview">
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
        {features.map((icon, index) => (
          <span className='text-xl' key={index}>{icon}</span>
        ))}
      </div>
      <p className='text-lg'>Price: ${price}/day  </p>
    </div>
  )
}


export default Rooms