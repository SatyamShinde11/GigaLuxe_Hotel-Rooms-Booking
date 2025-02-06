import React, { useEffect } from "react";
import Logo from "../assets/Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Invoice = ({ invoiceData }) => {
  const navigation = useNavigate();
  const {
    Price,
    CheckIn,
    CheckOut,
    RoomName,
    UserName,
    UserEmail,
    UserPhone,
    RazorpayPaymentId,
    RazorpayOrderId,
  } = invoiceData.data;
  const SendInvoiceData = async () => {
    try {
      const VerifyToken = localStorage.getItem("AuthToken");
      console.log(VerifyToken);

      if (!VerifyToken) {
        setIsAuthenticated(false);
        return navigate("/SignUp");
      }
      let token = VerifyToken.split("+");
      await axios
        .post(`http://localhost/api/v1/user/invoiceData`, invoiceData.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token[1]}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigation("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    SendInvoiceData();

    const timeoutId = setTimeout(() => {
      window.print();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white h-auto max-w-4xl w-full p-8 ">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <img src={Logo} alt="Company Logo" className="h-12" />
              <h1 className="text-4xl font-bold text-purple-800">Giga Luxe</h1>
            </div>
            <p className="text-sm text-gray-500">
              Invoice Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Payment ID: {RazorpayPaymentId}
            </p>
            <p className="text-sm text-gray-500">Order ID: {RazorpayOrderId}</p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <h2 className="text-2xl font-semibold text-purple-700">
              Giga Luxe
            </h2>
            <p className="text-sm text-gray-600">123 Luxury Street</p>
            <p className="text-sm text-gray-600">Pune, Maharashtra, 411001</p>
            <p className="text-sm text-gray-600">Phone: +1 (999)-999-9999</p>
            <p className="text-sm text-gray-600">Email: gigaluxe@support.com</p>
          </div>
        </header>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-700">Billed To:</h3>
          <p className="text-sm text-gray-600">{UserName}</p>
          <p className="text-sm text-gray-600">Phone: {UserPhone}</p>
          <p className="text-sm text-gray-600">Email: {UserEmail}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-700">
            Room Details:
          </h3>
          <p className="text-sm text-gray-600">Room Type: {RoomName}</p>
          <p className="text-sm text-gray-600">Check-in Date: {CheckIn}</p>
          <p className="text-sm text-gray-600">Check-out Date: {CheckOut}</p>
          <p className="text-sm text-gray-600">Amount: ₹{Price}</p>
        </div>

        <table className="w-full text-left border-collapse mb-8">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-3 border border-gray-300 text-purple-700">
                Room Type
              </th>
              <th className="p-3 border border-gray-300 text-purple-700">
                Check-In
              </th>
              <th className="p-3 border border-gray-300 text-purple-700">
                Check-Out
              </th>
              <th className="p-3 border border-gray-300 text-purple-700">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-purple-300">
              <td className="p-3 text-gray-600">{RoomName}</td>
              <td className="p-3 text-gray-600">{CheckIn}</td>
              <td className="p-3 text-gray-600">{CheckOut}</td>
              <td className="p-3 text-gray-600">₹{Price}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right">
          <h3 className="text-lg font-bold text-purple-800">Total: ₹{Price}</h3>
        </div>

        <footer className="mt-8">
          <p className="text-xs text-gray-500">
            Terms: Payment is due within 30 days from the invoice date. Late
            payments may incur additional charges.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            We hope you enjoyed your stay at Giga Luxe. Thank you for choosing
            us!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Invoice;
