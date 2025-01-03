import React from 'react'
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
import { Link } from 'react-router-dom';
const AllRooms = () => {
    let RoomsArr = [
        {
            img: Room,
            title: "Double Room 1",
            description:
                "Make yourself comfortable in any of our serene guest rooms and spacious suites...",
            features: [
                <MdOutlineWifi />,
                <MdAirplanemodeActive />,
                <MdLocalCafe />,
                <MdCall />,
            ],
            price: 500,
            type: "Double Room",
            adults: 2, // Add adults count
            children: 0, // Add children count
        },
        {
            img: Room,
            title: "Single Room 1",
            description:
                "A cozy retreat with essential amenities for a relaxing stay.",
            features: [<MdOutlineWifi />, <MdLocalCafe />, <MdCall />],
            price: 350,
            type: "Single Room",
            adults: 1,
            children: 0,
        },
        {
            img: Room,
            title: "Deluxe Suite 1",
            description: "Enjoy luxury and elegance in our spacious deluxe suites.",
            features: [
                <MdOutlineWifi />,
                <MdAirplanemodeActive />,
                <MdLocalCafe />,
                <MdCall />,
                <MdPool />,
            ],
            price: 800,
            type: "Suite",
            adults: 4,
            children: 2,
        },
        {
            img: Room,
            title: "Family Room 1",
            description: "Perfect for families, offering ample space and comfort.",
            features: [
                <MdOutlineWifi />,
                <MdAirplanemodeActive />,
                <MdLocalCafe />,
                <MdCall />,
                <MdChildFriendly />,
            ],
            price: 600,
            type: "Family Room",
            adults: 2,
            children: 2,
        },
        {
            img: Room,
            title: "Double Room 2",
            description:
                "Another option for a serene stay with two comfortable beds.",
            features: [
                <MdOutlineWifi />,
                <MdAirplanemodeActive />,
                <MdLocalCafe />,
                <MdCall />,
            ],
            price: 520,
            type: "Double Room",
            adults: 2,
            children: 1,
        },
        {
            img: Room,
            title: "Single Room 2",
            description: "A well-appointed single room with modern amenities.",
            features: [<MdOutlineWifi />, <MdLocalCafe />, <MdCall />],
            price: 370,
            type: "Single Room",
            adults: 1,
            children: 0,
        },
    ];

    return (
        <div className='mt-20 w-full flex flex-wrap gap-10 '>
            <div className='w-full flex justify-center items-center '>

                <RoomsFilter />
            </div>
            <div className='lg:px-20 flex flex-wrap lg:gap-12 gap-9 md:gap-0 justify-evenly'>
                {
                    RoomsArr.map((items, index) => {
                        const { img, type, title, description, features, adults, children, price } = items
                        return (
                            <div className='flex lg:w-[25vw] md:w-1/2 flex-col gap-5 p-3 border rounded-xl bg-white '>
                                <img src={img} alt="" className=' rounded-xl' />
                                <div className=' p-2 flex flex-col gap-4 font-semibold items-start'>
                                    <p className='text-purple-600 text-sm '>Type: {type}</p>
                                    <h1 className='md:text-3xl text-xl '>Title: {title}</h1>
                                    <p className='md:text-3xl text-xl'>Description: {description}</p>
                                    <div className='flex items-center gap-3 text-xl'>Features:  {features.map((icon, index) => (
                                        <span className='text-xl' key={index}>{icon}</span>
                                    ))}</div>
                                    <div className='text-xl flex gap-5'>
                                        <p>Adults:{adults}</p>
                                        <p>childrens:{children}</p>
                                    </div>
                                    <p className='text-xl font-extrabold'>Price ${price}/day</p>
                                    <Link to="/RoomPreview">
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