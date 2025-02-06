import React, { useState, useContext, useEffect } from "react";
import { HotelDataContext } from "../Context/HotelData.jsx";
import { Calendar } from "primereact/calendar";
import {
  MdAirplanemodeActive,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdBreakfastDining,
  MdCall,
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
import { Link, useLocation, useNavigate } from "react-router-dom";

const RoomPreview = () => {
  const { response } = useContext(HotelDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const roomData = location.state || {};

  const [RoomsData, setRoomsData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [dates, setDates] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const VerifyToken = localStorage.getItem("AuthToken");
    if (!VerifyToken) {
      navigate("/SignUp");
    }
  }, [navigate]);

  useEffect(() => {
    const foundRoom = response.find((item) => item._id === roomData);
    if (foundRoom) {
      setRoomsData(foundRoom);
      setMainImage(foundRoom.mainRoomImage);
    }
  }, [response, roomData]);

  useEffect(() => {
    if (!RoomsData?.isBookingDate) return;

    const newDisabledDates = RoomsData.isBookingDate.flatMap((item) => {
      const checkIn = new Date(item.CheckIn.split("/").reverse().join("-"));
      const checkOut = new Date(item.CheckOut.split("/").reverse().join("-"));

      let currentDate = new Date(checkIn);
      const datesArray = [];
      while (currentDate <= checkOut) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return datesArray;
    });

    setDisabledDates(newDisabledDates);
  }, [RoomsData]);
console.log(RoomsData);

  const dateTemplate = (date) => {
    const isDisabledDate = disabledDates.some(
      (d) =>
        d.getDate() === date.day &&
        d.getMonth() === date.month &&
        d.getFullYear() === date.year
    );

    return (
      <span
        style={{
          color: isDisabledDate ? "red" : "inherit",
          fontWeight: isDisabledDate ? "bold" : "normal",
        }}
      >
        {date.day}
      </span>
    );
  };

  const handleDateChange = (e) => {
    setDates(e.value);
  };

  let today = new Date();
  let nextMonth = today.getMonth() === 11 ? 0 : today.getMonth() + 1;
  let nextYear = nextMonth === 0 ? today.getFullYear() + 1 : today.getFullYear();

  let minDate = new Date();
  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  if (!RoomsData) return <p>Loading room data...</p>;

  return (
    <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-5 md:p-3 rounded-xl bg-white">
        <div className="md:w-1/2 w-screen flex flex-col gap-5 items-center justify-center">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2 lg:w-[550px] sm:w-[550px] md:w-[650px] w-[350px]"
          >
            <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
              <img src={mainImage} alt="Main Room" className="rounded-xl w-full" />
            </SwiperSlide>
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper lg:w-[550px] sm:w-[550px] md:w-[650px] w-[350px]"
          >
            {RoomsData.roomImages?.map((items, index) => (
              <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={items}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded-md cursor-pointer object-cover"
                  onClick={() => setMainImage(items)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="md:w-1/2 w-full p-5 flex flex-col items-start gap-4 font-semibold">
          <p className="text-purple-600 text-md">Type: {RoomsData.roomType}</p>
          <h1 className="text-3xl">Title: {RoomsData.name}</h1>
          <p className="text-md">{RoomsData.description}</p>
          <p className="text-md">Bed: {RoomsData.bedType}</p>
          <p className="text-md">Occupancy: Adults {RoomsData.man}, Children {RoomsData.kids}</p>
          <p className="text-md">Location: City {RoomsData.roomLocation}, Floor {RoomsData.roomFlour}, Room {RoomsData.roomNumber}</p>
          <p className="text-md">Size: {RoomsData.roomSize}</p>
          <p className="text-xl">Price ₹{RoomsData.price}/day</p>

          <div className="p-2 border-purple-600 border rounded-lg">
            <Calendar
              inputClassName="!outline-none focus:!outline-none !border-none"
              className="border-none"
              value={dates}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd/mm/yy"
              selectionMode="multiple"
              readOnlyInput
              hideOnRangeSelection
              showIcon
              disabledDates={disabledDates}
              dateTemplate={dateTemplate}
            />
          </div>

          <Link to={`/RoomBooking?RoomId=${RoomsData._id}`} state={[RoomsData, { BookingDates: dates }]}>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-xl text-white rounded-md font-medium">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPreview;
