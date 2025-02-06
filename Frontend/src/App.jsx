import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import AllRooms from "./Pages/AllRooms.jsx";
import RoomPreview from "./Pages/RoomPreview.jsx";
import RoomBooking from "./Pages/RoomBooking.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUP from "./Pages/SignUP.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import Admin from "./Admin/App.jsx";
import ProtectRoute from "./Components/ProtectRoute.jsx";
import Profile from "./Pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <BrowserRouter> <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={true}
        pauseOnHover={true}
      />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/AllRooms" element={<AllRooms />} />
        <Route path="/RoomPreview" element={<RoomPreview />} />
        <Route path="/RoomBooking" element={<RoomBooking />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUP" element={<SignUP />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectRoute>
              <Admin />
            </ProtectRoute>
          }
        >
          <Route path="/admin/" />
          <Route path="/admin/Rooms" />
          <Route path="/admin/Review" />
          <Route path="/admin/Booking" />
          <Route path="/admin/User" />
          <Route path="/admin/AddRoom" />
          <Route path="/admin/EditRoom" />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
