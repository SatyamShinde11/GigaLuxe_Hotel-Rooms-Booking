import React, { useContext, useEffect, useState } from "react";
import CINEMATIC from "../assets/CINEMATIC.mp4";
import Room from "../assets/room.jpg";
import { Calendar } from "primereact/calendar";
import Rooms from "../Components/Utils/Rooms";
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
import { TbAirConditioning } from "react-icons/tb";
import { FaPersonSwimming, FaRegUser } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Button from "../Components/Utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { HotelDataContext } from "../Context/HotelData";
import axios from "axios";
const Home = () => {
  const { response, setResponse } = useContext(HotelDataContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost/api/v1/room/getRooms")
        .then((res) => {
          console.log(res);
          setResponse(res.data.rooms);
          console.log(res.data.rooms);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };
  useEffect(() => {
    
    const VerifyToken = localStorage.getItem("AuthToken");
    console.log(VerifyToken);

    if (!VerifyToken) {
      return navigate("/SignUp")
    }fetchData();
  }, []);
  let RoomsArray = [...response || []]


  const testimonials = [
    {
      name: "Sarah M.",
      role: "Business Traveler",
      testimonial:
        "The hotel was amazing! The staff was friendly, the rooms were comfortable, and the view was breathtaking. I will definitely be back!",
    },
    {
      name: "John D.",
      role: "Vacationer",
      testimonial:
        "A perfect getaway! The amenities were top-notch, and the service was exceptional. Highly recommend this place for a relaxing vacation.",
    },
    {
      name: "Emily R.",
      role: "Conference Attendee",
      testimonial:
        "I stayed here for a conference, and it was the perfect location! Comfortable rooms, excellent service, and great facilities for business meetings.",
    },
    {
      name: "David L.",
      role: "Couple",
      testimonial:
        "We had a wonderful time! The hotel exceeded our expectations with its romantic ambiance, and the staff made our anniversary special.",
    },
    {
      name: "Olivia T.",
      role: "Solo Traveler",
      testimonial:
        "As a solo traveler, I felt safe and welcomed. The hotel’s location was perfect, and the staff was always available to offer help.",
    },
  ];
  return (
    <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
      <div className="w-full h-[85vh]  xl:h-[600px] relative flex flex-col md:items-start justify-center">
        <div className="md:w-1/2 absolute z-10 md:px-20 p-5 top-0   flex flex-col gap-7 items-start text-white md:top-[10%]">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to Giga{" "}
            <span className=" text-purple-600 font-extrabold ">Luxe</span>
          </h1>
          <p className="text-lg">
            Experience unparalleled luxury and comfort in the heart of the city.
            Whether you're here for business or leisure, your perfect stay
            begins with us.
          </p>
          <Link to={"/AllRooms"}>
            <Button text={"Explore Rooms"} />
          </Link>
        </div>
        <video
          src={CINEMATIC}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        ></video>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </div>

      <div className="flex flex-col gap-6 items-center justify-center w-full ">
        <div className="flex flex-col justify-center items-center gap-5 ">
          <h1 className="font-Ubuntu text-4xl font-semibold ">
            Hotel Master Rooms
          </h1>
          <p className="text-lg">Semper ac dolor vitae accumsan.</p>
          <div className="border-2 w-24 rounded-full border-purple-600"></div>
        </div>

        <div className="flex w-[100vw]">
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
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {RoomsArray.map((item) => {
              const {
                bedType,
                description,
                features,
                isBooked,
                mainRoomImage,
                name,
                price,
                roomType,
                _id,
              } = item;

              return (
                <SwiperSlide key={_id} style={{ display: "flex" }}>
                  <Rooms
                    type={roomType}
                    img={mainRoomImage}
                    title={name}
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
          <a className="text-xl hover:text-purple-600 font-semibold flex items-center gap-2">
            <MdArrowBackIosNew />
            View All Rooms
            <MdArrowForwardIos />
          </a>
        </Link>
      </div>

      <div
        id="services"
        className="flex flex-col gap-3 md:gap-6 items-center justify-center w-full"
      >
        <div className="flex flex-col justify-center items-center gap-5 ">
          <h1 className="font-Ubuntu text-4xl font-semibold ">Our Service</h1>
          <p className="text-lg text-center">
            Sailing Hotel provides all services you need.
          </p>
          <div className="border-2 w-24 rounded-full border-purple-600"></div>
        </div>
        <div
          className="md:px-20 flex flex-wrap justify-center items-start   gap-4 md:gap-9
                 "
        >
          <div className="md:w-96  p-5 border rounded-2xl flex flex-col justify-center items-center text-center gap-4 bg-white">
            <p className="text-7xl">
              <FaPersonSwimming />
            </p>
            <h2 className="text-2xl font-semibold">Swimming Pool</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              ducimus.
            </p>
          </div>
          <div className="md:w-96  p-5 border rounded-2xl flex flex-col justify-center items-center text-center gap-4 bg-white">
            <p className="text-7xl">
              <MdOutlineWifi />
            </p>
            <h2 className="text-2xl font-semibold">Free Wifi</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              ducimus.
            </p>
          </div>
          <div className="md:w-96  p-5 border rounded-2xl flex flex-col justify-center items-center text-center gap-4 bg-white">
            <p className="text-7xl">
              <MdLocalTaxi />
            </p>
            <h2 className="text-2xl font-semibold">Airport Taxi</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              ducimus.
            </p>
          </div>
          <div className="md:w-96  p-5 border rounded-2xl flex flex-col justify-center items-center text-center gap-4 bg-white">
            <p className="text-7xl">
              <MdBreakfastDining />
            </p>
            <h2 className="text-2xl font-semibold">Breakfast</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              ducimus.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  gap-6 items-center justify-center w-full md:h-auto ">
        <div className="flex flex-col justify-center items-center gap-5 md:w-[20%] w-1/2 ">
          <h1 className="font-Ubuntu text-4xl font-semibold ">Testimonials</h1>
          <p className="text-lg text-center">
            The hotel was amazing! The staff was friendly, the rooms were
            comfortable, and the view was breathtaking. I will definitely be
            back!
          </p>
          <div className="border-2 w-24 rounded-full border-purple-600"></div>
        </div>
        <div className=" flex h-auto  w-1/2 md:w-[70%]  ">
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
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Navigation]}
            className="mySwiper  "
          >
            {testimonials.map((items, index) => {
              const { name, role, testimonial } = items;
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                  }}
                >
                  <div className="bg-white w-auto p-6 rounded-lg shadow-lg md:p-5 ">
                    <p className=" text-lg text-gray-600 italic">
                      " {testimonial} "
                    </p>

                    <div className="mt-4 flex items-center gap-5">
                      <div className="text-3xl">
                        <FaRegUser />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{name}</p>
                        <p className="text-sm text-gray-500">{role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
