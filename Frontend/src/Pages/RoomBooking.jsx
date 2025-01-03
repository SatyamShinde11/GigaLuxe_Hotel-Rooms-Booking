import React from 'react'
const RoomBooking = () => {
    return (
        <div className='w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-4 items-start font-Poppins overflow-hidden'>
            <h1 className='text-lg md:text-xl font-extrabold'>Cart</h1>

            <div className="relative w-full bg-white rounded-md overflow-x-auto">
                <table className="text-left w-full ">
                    <thead className="font-extrabold text-sm md:text-md uppercase text-white bg-purple-600 border border-purple-600">
                        <tr className='text-center'>
                            <th scope="col" className="px-2 md:px-3 py-3">Room</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Checkin - Checkout</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Capacity</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Night</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Quantity</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Deposit Payment</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Gross Total</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Cancel Room</th>
                        </tr>
                    </thead>
                    <tbody className='border text-sm md:text-md border-purple-600 font-semibold'>
                        <tr className="text-center">
                            <th scope="col" className="px-2 md:px-3 py-3">Family Room 3</th>
                            <td className="px-4 md:px-6 py-4">25/12/2024 - 28/12/2024</td>
                            <td className="px-4 md:px-6 py-4">2 adults</td>
                            <td className="px-4 md:px-6 py-4">4</td>
                            <th scope="col" className="px-2 md:px-3 py-3">1</th>
                            <th scope="col" className="px-2 md:px-3 py-3">Disable</th>
                            <th scope="col" className="px-2 md:px-3 py-3">$700.00</th>
                            <th scope="col" className="px-2 md:px-3 py-3">
                                <a className='text-purple-600 cursor-pointer'>Cancel</a>
                            </th>
                        </tr>
                    </tbody>
                </table>


            </div>
            <div className='flex flex-col mt-4 w-full'>
                <div className='flex justify-between text-xs md:text-sm text-gray-500 border-b border-t border-x border-purple-600 p-2'>
                    <p>Sub Total</p> <span>$700.00</span>
                </div>
                <div className='flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2'>
                    <p>Tax</p> <span>10%</span>
                </div>
                <div className='flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2'>
                    <p>Grand Total</p> <span>$770.00</span>
                </div>
                <div className='flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2'>
                    <p>Advance Payment</p> <span>$385.00</span>
                </div>
            </div>
            <button className='px-4 md:px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-sm md:text-lg text-white rounded-lg font-medium flex items-center justify-center'>
                Check Out
            </button>
        </div>

    )
}

export default RoomBooking