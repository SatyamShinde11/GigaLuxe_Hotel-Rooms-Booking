import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import connectDB from "./libs/ConnectDB.js";
import cors from "cors";
import UserRouter from "./Router/User.Router.js";
import RoomsRouter from "./Router/Room.Router.js";
import AdminRouter from "./Router/Admin.Router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const corsOption = {
  origin: "*",
};
app.use(cors(corsOption));

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/room", RoomsRouter);
app.use("/api/v1/admin", AdminRouter);


app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server Is Started!");
});
