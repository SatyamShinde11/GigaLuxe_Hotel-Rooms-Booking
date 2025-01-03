import { Calendar } from 'primereact/calendar';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const RoomsFilter = () => {

    const [dates, setDates] = useState(null);
    const [Adults, setAdults] = useState(1);
    const [Children, setChildren] = useState(0);

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
        <div className="flex p-3 w-[90%] sm:flex-row  sm:gap-5 gap-3 flex-wrap justify-center bg-gray-200/50 items-center rounded-xl ">

            <div className="p-2 w-full  sm:w-1/3 bg-white rounded-lg flex justify-content-center">
                <Calendar
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
            </div>

            <div className="p-2 bg-white rounded-lg flex justify-evenly items-center w-screen sm:w-1/4 md:w-1/6
              ">
                <span>Adults</span>{" "}
                <div className="flex justify-between items-center  gap-1 bg-purple-200/50 rounded-md w-1/2 ">
                    <button
                        className="py-1 text-xl cursor-pointer  rounded-md px-2"
                        onClick={() => { Adults === 10 ? 10 : setAdults(Adults + 1) }}
                    >
                        +
                    </button>
                    {Adults}
                    <button
                        className="py-1 text-xl cursor-pointer  rounded-md px-2"
                        onClick={() => { Adults === 1 ? 1 : setAdults(Adults - 1) }}
                    >
                        -
                    </button>
                </div>
            </div>
            <div className="p-2 bg-white rounded-lg flex justify-evenly items-center w-screen sm:w-1/4 md:w-1/6
              ">
                <span>Children</span>{" "}
                <div className="flex justify-between items-center  gap-1 bg-purple-200/50 rounded-md w-1/2 ">
                    <button
                        className="py-1 text-xl cursor-pointer  rounded-md px-2"
                        onClick={() => { Children === 5 ? 5 : setChildren(Children + 1) }}
                    >
                        +
                    </button>
                    {Children}
                    <button
                        className="py-1 text-xl cursor-pointer  rounded-md px-2"
                        onClick={() => { Children === 0 ? 1 : setChildren(Children - 1) }}
                    >
                        -
                    </button>
                </div>
            </div>

            <Link to="/AllRooms"><button className="uppercase py-3 px-5 bg-purple-600 text-white font-semibold rounded-xl   ">
                Check Avalability
            </button>
            </Link>


        </div>
    )
}

export default RoomsFilter