import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
    isBookingDate:{
        type:Array,
        
    },
    mainRoomImage: {
        type: String,
        required: true
    },
    roomImages: {
        type: Array,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedType: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomSize: {
        type: String,
        required: true
    },
    roomLocation: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    roomFlour: {
        type: String,
        required: true
    },
    man: {
        type: Number,
        required: true
    },
    kids: {
        type: Number,
        required: true
    },

}, { timestamps: true })

const Rooms = mongoose.model("Rooms", RoomSchema)
export default Rooms