import { Router } from "express"
import { CreateBooking, EditBooking, GetBookings } from "../Controller/Booking.Controller.js"

const router = Router()

router.route("/getBookings").get(GetBookings)
router.route("/createBooking").post(CreateBooking)
router.route("/editBooking").put(EditBooking)