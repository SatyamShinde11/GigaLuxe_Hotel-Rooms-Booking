import React, { useContext, useState } from "react";
import { AuthDataContext } from "../Context/AuthData";
import { FaFilePdf } from "react-icons/fa";
import Invoice from "../Components/Invoice";

const Profile = () => {
  const { authResponse, setAuthResponse } = useContext(AuthDataContext);
  const [ShowInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  let UserData = authResponse?.data?.User?.BookedRooms || [];
  let InvoiceFilterData = authResponse?.data?.User?.InvoiceData;
  console.log(InvoiceFilterData);


  const handelDownloadPDF = (_id) => {
    console.log(_id);
    
    InvoiceFilterData.map((item) => {
console.log(item);

      if (item._id === _id) {
        let data = { data: item }
        setInvoiceData(data);
        setShowInvoice(true)
        return item;
      }
    });
  };
  return (
    <div className="w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-16 items-center font-Poppins overflow-hidden">
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-4xl text-center font-semibold text-purple-600">
          Profile
        </h1>
        <div className="flex gap-10 justify-between">
          <div>
            <h1>Name : {authResponse?.data?.User?.name}</h1>
            <p>Email : {authResponse?.data?.User?.email}</p>
            <p>phone : +91 {authResponse?.data?.User?.phoneNumber}</p>
            <h1>Address : {authResponse?.data?.User?.location} </h1>
          </div>
        </div>
        <div>
          <h1>Bookings</h1>
          <div className="overflow-auto w-full">
            <table className="w-full w-min-20 text-left border-collapse overflow-auto">
              <thead className="bg-purple-200 text-purple-700">
                <tr>
                  <th className="p-2 text-nowrap  font-semibold ">No</th>
                  <th className="p-2 text-nowrap  font-semibold ">Room Name</th>
                  <th className="p-2 text-nowrap  font-semibold ">CheckIn</th>
                  <th className="p-2 text-nowrap  font-semibold ">CheckOut</th>
                  <th className="p-2 text-nowrap  font-semibold ">Price</th>
                  <th className="p-2 text-nowrap  font-semibold ">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {InvoiceFilterData.map((ele, index) => {
                  console.log(ele);

                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td className=" p-2 text-nowrap   text-gray-500 ">{index + 1}</td>
                      <td className=" p-2 text-nowrap   text-gray-500 ">{ele?.RoomName}</td>
                      <td className=" p-2 text-nowrap   text-gray-500 ">{ele?.CheckIn}</td>
                      <td className=" p-2 text-nowrap   text-gray-500 ">{ele?.CheckOut}</td>
                      <td className=" p-2 text-nowrap   text-gray-500 ">₹ {ele?.Price}</td>
                      <td className=" p-2 text-nowrap   text-gray-500 ">
                        <FaFilePdf
                          onClick={() => handelDownloadPDF(ele._id)}
                          className="text-xl cursor-pointer hover:text-purple-600  "
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {ShowInvoice && (
            <div className="fixed top-0 left-0  z-50 w-full h-full ">
              <Invoice invoiceData={invoiceData} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;
