import Rooms from "../Model/Room.Model.js";
import Users from "../Model/User.Model.js";
import Bookings from "../Model/Booking.Model.js";
import fs from "fs";

export const CreateRoom = async (req, res) => {
    try {
        console.log("Upload Folder:", req.uploadFolder);

        const {
            name,
            description,
            price,
            man,
            kids,
            bedType,
            features,
            roomType,
            roomSize,
            roomFlour,
            roomNumber,
            roomLocation,
        } = req.body;

        if (
            !name ||
            !description ||
            !price ||
            !man ||
            !kids ||
            !bedType ||
            !features ||
            !roomType ||
            !roomSize ||
            !roomFlour ||
            !roomNumber ||
            !roomLocation
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const roomData = {
            name,
            description,
            price,
            man,
            kids,
            bedType,
            features: features.split(","),
            roomType,
            roomSize,
            roomFlour,
            roomNumber,
            roomLocation,
            mainRoomImage: req.body.mainRoomImage,
            roomImages: req.body.roomImages,
        };

        if (req.uploadFolder) {
            fs.rmSync(req.uploadFolder, { recursive: true, force: true });
        }

        const room = await Rooms.create(roomData);
        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            room,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create room",
            error,
        });
    }
};
export const GetRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find();

        if (rooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Rooms not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rooms found successfully",
            rooms,
        });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch rooms",
            error: error.message,
        });
    }
};
export const EditRoom = async (req, res) => {
    try {
        const { id } = req.body.Data;
        if (!id) {
            return res.status(400).json({ message: "Room ID is required" });
        }

        const room = await Rooms.findById(id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const updatedRoom = await Rooms.findByIdAndUpdate(
            id,
            { $set: req.body.Data },
            { new: true }
        );
        if (!updatedRoom) {
            return res.status(500).json({ message: "Failed to update room" });
        }

        res
            .status(200)
            .json({ message: "Room updated successfully", data: updatedRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Booking Controllers

export const GetBookings = (req, res) => { };
export const CreateBooking = async (req, res) => {
    try {
        const { Token } = req;
        const { roomId, TotalPrice, CheckIn, CheckOut } = req.body.data;
        console.log(CheckIn, CheckOut);
        let Dates = { CheckIn: CheckIn, CheckOut: CheckOut };

        if (!roomId || !TotalPrice || !CheckIn || !CheckOut) {
            res.status(400).json({
                message: "Room are required",
                success: false,
            });
        }
        const user = await Users.findOne({ email: Token });
        const room = await Rooms.findById({ _id: roomId });
        // console.log(user);
        // console.log(room);
        await user.updateOne({ $push: { BookedRooms: room } });
        await room.updateOne({ isBooked: true, $push: { isBookingDate: Dates } });
        const RoomBooked = await Bookings.create({
            price: TotalPrice,
            CheckIn,
            CheckOut,
            User: user,
            Room: room,
        });
        console.log(RoomBooked);


        res.status(201).json({ message: "Booking created successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const EditBooking = (req, res) => { };
export const BookingPayment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
