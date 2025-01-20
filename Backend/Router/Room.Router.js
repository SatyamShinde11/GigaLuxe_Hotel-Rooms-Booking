import { Router } from "express";
import { CreateBooking, CreateRoom, EditBooking, EditRoom, GetBookings, GetRooms } from "../Controller/Room.Controller.js";
import { uploadMiddleware } from "../Middleware/Room.Middleware.js";
import { uploadToCloudinaryMiddleware } from "../Middleware/UploadToCloudinary.Middleware.js";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";

const router = Router();

router.route("/getRooms").get(GetRooms);
router.route("/createRoom").post(uploadMiddleware, uploadToCloudinaryMiddleware, CreateRoom);
router.route("/editRoom").post(EditRoom);
// Booking Routes
router.route("/getBookings").get(GetBookings)
router.route("/createBooking").post(AuthMiddleware, CreateBooking)
router.route("/editBooking").put(EditBooking)

export default router;
