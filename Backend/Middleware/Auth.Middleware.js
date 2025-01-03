import jwt from "jsonwebtoken"


export const AuthMiddleware = async (req, res, next) => {

    try {
        const emailToken = req.headers.authorization;

        if (!emailToken || !emailToken.startsWith("Bearer")) {
            return res.status(401).json({ message: "Authorization token missing or invalid." });
        }
        const jwtToken = String(emailToken).split(" ")[1]
        const verifiedToken = await jwt.verify(jwtToken, "GigaLuxe");

        req.Token = verifiedToken.data;
        next()
    } catch (error) {

    }
}