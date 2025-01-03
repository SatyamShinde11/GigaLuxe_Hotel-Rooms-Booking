import React, { useState } from "react";
import Room from "../assets/room.jpg";
import { Calendar } from 'primereact/calendar';
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

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Rooms from "../Components/Utils/Rooms";
const RoomPreview = () => {
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
    },
    {
      img: Room,
      title: "Single Room 1",
      description:
        "A cozy retreat with essential amenities for a relaxing stay.",
      features: [<MdOutlineWifi />, <MdLocalCafe />, <MdCall />],
      price: 350,
      type: "Single Room",
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
    },
    {
      img: Room,
      title: "Single Room 2",
      description: "A well-appointed single room with modern amenities.",
      features: [<MdOutlineWifi />, <MdLocalCafe />, <MdCall />],
      price: 370,
      type: "Single Room",
    },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [Adults, setAdults] = useState(1);
  const [Children, setChildren] = useState(0);
  const [dates, setDates] = useState(null);

  const ImgArr = [
    { img: Room },
    { img: Room },
    { img: Room },
    { img: Room },
    { img: Room },
    { img: Room },
  ];

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
  return (
    <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-5 md:p-3 rounded-xl bg-white  ">
        <div className="md:w-1/2 w-screen flex flex-col gap-5  items-center justify-center ">

          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2 lg:w-[550px] sm:w-[550px] md:w-[650px] md:h-auto sm:h-[30vh] w-[350px]  "
          >
            {ImgArr.map((items, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={items.img} alt="" className="rounded-xl w-full" />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper  lg:w-[550px] sm:w-[550px] md:w-[650px] md:h-auto w-[350px]    "
          >
            {ImgArr.map((items, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={items.img}
                  alt=""
                  className="rounded-md    object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
        <div className="md:w-1/2 w-screen p-5 flex flex-col items-start gap-4 font-semibold">
          <p className="text-purple-600 text-md ">Type: Double Room</p>
          <h1 className="text-3xl ">Title: Double Room 1</h1>
          <p className="text-md">
            Description: Make yourself comfortable in any of our serene guest
            rooms and spacious suites...
          </p>
          <p className="text-md">Bed : 1 double bed</p>
          <p className="flex gap-2 text-md">Occupancy :<div className="flex gap-2" >
            <p >Adults: 2</p>
            <p>childrens: 1</p>
          </div></p>
          <p className="text-md">Location : 1st to 5th floor
          </p>
          <p className="text-md">Size : Approximately 20 m²</p>
          <div className="flex items-center gap-3 text-md">
            Features: <MdOutlineWifi />
            <MdAirplanemodeActive />
            <MdLocalCafe />
            <MdCall />
          </div>

          <p className="text-xl">Price $200/day</p>
          <div className="flex flex-col md:flex-row items-start justify-between  gap-5 md:items-center ">
            <div className="p-2 border-purple-600 border rounded-lg flex justify-content-center">
              <Calendar
                style={{
                  color: "purple",
                  border: "none",
                  outline: "none"
                }}
                inputClassName="!outline-none fouce:!outline-none !border-none !stroke-none"
                className="border-none "
                value={dates}
                onChange={(e) => setDates(e.value)}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat="dd/mm/yy"
                selectionMode="range"
                readOnlyInput
                hideOnRangeSelection
                showIcon
              />
            </div> <Link to={"/RoomBooking"}>
              <button className="px-6 py-2   bg-purple-600 hover:bg-purple-700 text-xl text-white rounded-md font-medium flex items-center justify-center">Book Now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center justify-center w-full ">
        <div className="flex flex-col justify-center items-center gap-5 ">
          <h1 className="font-Ubuntu text-4xl font-semibold ">
            Mores Rooms
          </h1>
          <div className="border-2 w-24 rounded-full border-purple-600"></div>
        </div>

        <div className=" flex   w-[100vw]">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            spaceBetween={20}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {RoomsArr.map((items, index) => {
              const { description, features, img, price, title, type } = items;
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    display: 'flex',
                  }}
                >
                  <Rooms
                    type={type}
                    img={img}
                    title={title}
                    description={description}
                    features={features}
                    price={price}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Link to="/AllRooms">
          <a className="text-xl hover:text-purple-600 font-semibold flex items-center gap-2"  ><MdArrowBackIosNew />View All Rooms<MdArrowForwardIos /></a>
        </Link>
      </div>
    </div>
  );
};

export default RoomPreview;
