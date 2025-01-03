import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
    Name: {
        type: String
    }
})

export default Rooms = mongoose.model("Rooms", RoomSchema)