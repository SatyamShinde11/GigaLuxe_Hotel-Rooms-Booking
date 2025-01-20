import { Router } from "express"
import { AdminLogin } from "../Controller/Admin.Controller.js";

const router = Router();

router.route("/Login").post(AdminLogin)

export default router