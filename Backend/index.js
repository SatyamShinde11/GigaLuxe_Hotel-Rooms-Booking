import express from "express"
import dotenv from "dotenv"
import connectDB from "./libs/ConnectDB.js";
import cors from "cors"
import UserRouter from "./Router/User.Router.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const corsOption = {
    origin: "*"
}
app.use(cors(corsOption))

app.use("/api/user", UserRouter)

app.listen(process.env.PORT, () => {
    connectDB()
    console.log("Server Is Started!");
})
