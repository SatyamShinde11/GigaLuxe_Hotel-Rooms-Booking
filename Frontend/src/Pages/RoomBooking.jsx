import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../assets/Logo.svg";
import Invoice from "../Components/Invoice";

const RoomBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomData = location.state || {};
  console.log(roomData);

  const [ShowInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [PaymentVerificationData, setPaymentVerificationData] = useState({});

  let CheckIn =
    roomData[1]?.BookingDates?.[0]?.toLocaleDateString() || "N/A";  
  let CheckOut =
    roomData[1]?.BookingDates?.[1]?.toLocaleDateString() || "N/A"; 

  const [RoomsData, setRoomsData] = useState(roomData[0]);
  console.log(RoomsData);

  const TotalPrice = (RoomsData.price + RoomsData.price * 0.1).toFixed(2);

  const Token = localStorage.getItem("AuthToken");
  const CreatedBooking = async (data, token) => {
    try {
      await axios
        .post(
          "http://localhost/api/v1/room/createBooking",
          { data },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token[1]}`,
            },
          }
        )
        .then((response) => {
          const responseData =
            typeof response.data === "string"
              ? JSON.parse(response.data)
              : response.data;
          const { roomId, Token } = responseData;
          const { amount, receipt } = responseData.data;

          const data = responseData.data;
          setPaymentVerificationData({ roomId, Token, amount, receipt });
          var options = {
            key: responseData.key,
            amount: data.amount,
            currency: data.currency,
            name: "Giga Luxe",
            description: "Test Transaction",
            image: Logo,
            order_id: data.id,

            handler: async function (response) {
              console.log(PaymentVerificationData);
              
              const InputData = {
                response: response,
           PaymentVerificationData,
                CheckIn: CheckIn,
                CheckOut: CheckOut,
              };
              console.log(InputData);

              await axios
                .post(
                  "http://localhost/api/v1/room/verifyBooking",
                  { InputData },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  setInvoiceData(response.data);
                  toast.success(
                    response.data?.message || "Room Booked Successfully!"
                  );
                  setInterval(() => {
                    setShowInvoice(true);
                  }, 2000);
                });
            },
            prefill: {
              name: "Satyam Shinde",
              email: "",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#7E22CE",
            },
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Room booking failed.");
    }
  };

  const handelRoomBooking = async () => {
    console.log(RoomsData);
    for (let element of roomData[0]?.isBookingDate || []) {
      console.log(element);

      if (element.CheckIn === CheckIn) {
        toast.error("Already booked, please select another date.");
        return;
      }
    }

    if (!Token) {
      toast.error("User is not authenticated");
      return navigate("/SignUp");
    }

    const token = Token.split("+");
    const data = {
      roomId: RoomsData._id,
      Price: RoomsData.price,
      CheckIn,
      CheckOut,
    };
    console.log(data, token);

    CreatedBooking(data, token);
  };

  const handelRoomCancel = () => {
    toast.success("Room Cancelled Successfully!");
    navigate("/AllRooms");
  };

  useEffect(() => {
    const VerifyToken = localStorage.getItem("AuthToken");
    if (!VerifyToken) {
      toast.error("User not authenticated. Redirecting to signup.");
      return navigate("/SignUp");
    }
  }, [navigate]);

  return (
    <div className="relative w-full xl:w-[1280px] py-2 mt-10 h-auto flex flex-col gap-4 items-start font-Poppins overflow-hidden">
      <h1 className="text-lg md:text-xl font-extrabold">Cart</h1>

      <div className="relative w-full bg-white rounded-md overflow-x-auto">
        <table className="text-left w-full">
          <thead className="font-extrabold text-sm md:text-md uppercase text-white bg-purple-600 border border-purple-600">
            <tr className="text-center">
              <th scope="col" className="px-2 md:px-3 py-3">
                Room
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Bed Type
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                CheckIn to CheckOut
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Capacity
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Night
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Quantity
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Gross Total
              </th>
              <th scope="col" className="px-2 md:px-3 py-3">
                Cancel Room
              </th>
            </tr>
          </thead>
          <tbody className="border text-sm md:text-md border-purple-600 font-semibold">
            <tr className="text-center">
              <td className="px-2 md:px-3 py-3">{RoomsData.roomType}</td>
              <td className="px-2 md:px-3 py-3">{RoomsData.bedType}</td>
              <td className="px-4 md:px-6 py-4">
                {CheckIn} to {CheckOut}
              </td>
              <td className="px-4 md:px-6 py-4">
                {RoomsData.kids + RoomsData.man}
              </td>
              <td className="px-4 md:px-6 py-4">4</td>
              <td className="px-2 md:px-3 py-3">1</td>
              <td className="px-2 md:px-3 py-3">
                ${RoomsData.price.toFixed(2)}
              </td>
              <td className="px-2 md:px-3 py-3">
                <a
                  className="text-purple-600 cursor-pointer"
                  onClick={handelRoomCancel}
                >
                  Cancel
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col mt-4 w-full">
        <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-t border-x border-purple-600 p-2">
          <p>Sub Total</p>
          <span>₹{RoomsData.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2">
          <p>Tax</p>
          <span>10%</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm text-gray-500 border-b border-x border-purple-600 p-2">
          <p>Total</p>
          <span>₹{TotalPrice}</span>
        </div>
      </div>

      <button
        onClick={handelRoomBooking}
        className="px-4 md:px-6 py-2 mt-4 bg-purple-600 hover:bg-purple-700 text-sm md:text-lg text-white rounded-lg font-medium flex items-center justify-center"
      >
        Check Out
      </button>
      {ShowInvoice && (
        <div className="fixed top-0 left-0  z-50 w-full h-full ">
          <Invoice invoiceData={invoiceData} />
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
