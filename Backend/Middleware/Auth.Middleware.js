import jwt from "jsonwebtoken";
import Users from "../Model/User.Model.js";
export const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing or invalid." });
        }

        const token = authHeader.split(" ")[1];
        console.log(token);

        if (!token || token == undefined) {
            return res.status(401).json({ message: 'No token provided', success: false, });
        }


        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET || "GigaLuxe");
        const user = await Users.findOne({ email: verifiedToken.data });
        if (!user) {
            return res.status(400).json({
                message: 'No email provided', success: false,
            })
        }
        req.Token = verifiedToken.data;

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({
            message: "Unauthorized access. Invalid or expired token.",
            success: false,
            error: error.message,
        });
    }
};
