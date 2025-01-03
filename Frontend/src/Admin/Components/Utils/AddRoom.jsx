import { Calendar } from "primereact/calendar";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
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
const AddRoom = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let AdminKey = sessionStorage.getItem("Admin");
    if (!AdminKey) {
      navigate("/admin/login");
    }
  });
  const [dates, setDates] = useState(null);
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

  const [Adults, setAdults] = useState();
  const [Children, setChildren] = useState();
  return (
    <div className="bg-gray-300/20 p-6  w-full  h-auto flex flex-col  font-Poppins overflow-hidden">
      <div
        onPointerLeave={() => setPopUpRooms(false)}
        className=" w-[70vw] top-0 right-0 bg-white/90 flex flex-col gap-7  h-auto  p-6 rounded-2xl"
      >
        <div>
          <h1 className="font-semibold">Add Rooms</h1>
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            placeholder="Room Title*"
            required
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          />
          <input
            type="text"
            placeholder="Description"
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          />
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            placeholder="Bed Type*"
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            required
          />
          <input
            type="text"
            placeholder="Room Location*"
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            required
          />
          {/* <select
            name=""
            id=""
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          >
            <option value="">male</option>
            <option value="">woman</option>
            <option value="">Both</option>
          </select> */}
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            placeholder="Room Size*"
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            required
          />
          <select
            name=""
            id=""
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          >
            <option className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 ">
              Room Type
            </option>
            <option
              value=""
              className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            >
              Single
            </option>
            <option
              value=""
              className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            >
              Double
            </option>
            <option
              value=""
              className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            >
              Suite
            </option>
          </select>
        </div>
        <div className="flex justify-evenly gap-8 ">
          <input
            type="number"
            placeholder="Adults*"
            value={Adults}
            onChange={(e) => setAdults(e.target.value)}
            required
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          />
          <input
            type="number"
            value={Children}
            onChange={(e) => setChildren(e.target.value)}
            placeholder="Children"
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
          />
        </div>
        <div className="flex justify-evenly gap-8 w-full  text-xl">
          <p>Features</p>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdPool />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdCall />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdLocalTaxi />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdLocalCafe />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdAirplanemodeActive />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdBreakfastDining />
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <input
              type="checkbox"
              required
              className=" w-1/2 p-4 rounded-lg border-2 outline-none cursor-pointer border-purple-500/70 "
            />
            <MdOutlineWifi />
          </div>

          {/* <Calendar
            className=" w-1/2 p-4 rounded-lg border-2 outline-none border-purple-500/70 "
            value={dates}
            onChange={(e) => setDates(e.value)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd/mm/yy"
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            showIcon
          /> */}
        </div>
        <div className="flex justify-evenly gap-8">
          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Main Image</p>
            <input type="file" required />
          </div>

          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 1</p>
            <input type="file" required />
          </div>
        </div>
        <div className="flex justify-evenly gap-8">
          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 2</p>
            <input type="file" required />
          </div>

          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 3</p>
            <input type="file" required />
          </div>
        </div>
        <div className="flex justify-evenly gap-8">
          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 4</p>
            <input type="file" required />
          </div>

          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 5</p>
            <input type="file" required />
          </div>
        </div>
        <div className="flex justify-evenly gap-8">
          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 6</p>
            <input type="file" required />
          </div>

          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 7</p>
            <input type="file" required />
          </div>
        </div>
        <div className="flex  gap-8">
          <button
            className="px-3 py-2  bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
            onClick={() => setPopUpRooms(false)}
          >
            Submit
          </button>{" "}
          <button
            className="px-3 py-2  bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium flex items-center justify-center"
            onClick={() => setPopUpRooms(false)}
          >
            Canal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
