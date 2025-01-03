import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    Name: {
        type: String
    }
})

export default Bookings = mongoose.model("Bookings", BookingSchema)