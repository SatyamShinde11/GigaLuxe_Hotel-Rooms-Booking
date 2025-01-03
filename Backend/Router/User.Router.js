import { Router } from "express"
import { LogOut, SignIN, SignUP ,SendOtp,VerifyEmail} from "../Controller/User.Controller.js";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";

const router = Router();

router.route("/signin").post(AuthMiddleware,SignIN);
router.route("/signup").post(SignUP);
router.route("/sendOtp").post(SendOtp);
router.route("/verifyemail").post(VerifyEmail);
router.route("/logout").get(LogOut);

export default router