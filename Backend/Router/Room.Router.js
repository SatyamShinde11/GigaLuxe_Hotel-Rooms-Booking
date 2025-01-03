import { Router } from "express"
import { CreateRoom, EditRoom, GetRooms } from "../Controller/Room.Controller.js"

const router = Router()

router.route("/getrooms").get(GetRooms)
router.route("/createroom").post(CreateRoom)
router.route("/editroom").put(EditRoom)