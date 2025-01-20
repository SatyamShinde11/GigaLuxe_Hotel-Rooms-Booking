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
  const navigate = useNavigate();
  const location = useLocation();
  const roomData = location.state || {};


  const [RoomsData, setRoomsData] = useState({
    name: roomData.name || "",
    description: roomData.description || "",
    price: roomData.price || "",
    man: roomData.man || 0,
    kids: roomData.kids || 0,
    bedType: roomData.bedType || "",
    features: roomData.features || [],
    isBooked: roomData.isBooked || false,
    roomType: roomData.roomType || "",
    roomSize: roomData.roomSize || "",
    roomFlour: roomData.roomFlour || "",
    roomNumber: roomData.roomNumber || "",
    roomLocation: roomData.roomLocation || "",
    id: roomData._id || "",
    mainRoomImage: roomData.mainRoomImage || "",
    roomImages: roomData.roomImages || [],
    BookingDate: roomData.isBookingDate || [],
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

  const [mainImage, setMainImage] = useState(RoomsData.mainRoomImage);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [dates, setDates] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const VerifyToken = localStorage.getItem("AuthToken");
    if (!VerifyToken) {
      return navigate("/SignUp");
    }

    const newDisabledDates = [];
    roomData.isBookingDate.forEach((item) => {
      const checkInDate = item.CheckIn.split("/").reverse().join("-");
      const checkOutDate = item.CheckOut.split("/").reverse().join("-");
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      let currentDate = new Date(checkIn);
      while (currentDate <= checkOut) {
        newDisabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    setDisabledDates(newDisabledDates);
  }, [roomData]);

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
  let month = today.getMonth();
  let year = today.getFullYear();
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  let minDate = new Date();
  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

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
            className="mySwiper2 lg:w-[550px] sm:w-[550px] md:w-[650px] md:h-auto sm:h-[30vh] w-[350px]"
          >
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={mainImage}
                alt="Main Room"
                className="rounded-xl w-full"
              />
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
            className="mySwiper lg:w-[550px] sm:w-[550px] md:w-[650px] md:h-auto w-[350px]"
          >
            {RoomsData.roomImages.map((items, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
          <p className="flex gap-2 text-md">
            Occupancy:
            <div className="flex gap-2">
              <p>Adults: {RoomsData.man}</p>
              <p>Children: {RoomsData.kids}</p>
            </div>
          </p>
          <p className="text-md">
            Location:
            {` City: ${RoomsData.roomLocation}, Flour No: ${RoomsData.roomFlour}, Room No: ${RoomsData.roomNumber}`}
          </p>
          <p className="text-md">Size: {RoomsData.roomSize}</p>
          <div className="flex items-center gap-3 text-md">
            Features:
            {RoomsData.features.map((feature, index) => {
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

          <p className="text-xl">Price ₹{RoomsData.price}/day</p>
          <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:items-center">
            <div className="p-2 border-purple-600 border rounded-lg flex justify-content-center">
              <Calendar
                style={{ color: "purple", border: "none", outline: "none" }}
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
            <Link
              to={`/RoomBooking?RoomId=${RoomsData.id}`}
              state={[
                { ...RoomsData },
                { id: RoomsData.id },
                { BookingDates: dates },
              ]}
            >
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-xl text-white rounded-md font-medium flex items-center justify-center">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <Link to={`/AllRooms`}>
          <a className="text-xl hover:text-purple-600 font-semibold flex items-center gap-2">
            <MdArrowBackIosNew />
            View All Rooms
            <MdArrowForwardIos />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RoomPreview;
