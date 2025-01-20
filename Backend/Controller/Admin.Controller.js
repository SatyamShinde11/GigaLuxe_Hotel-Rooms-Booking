import jwt from "jsonwebtoken";
export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({
                message: "Email and password are required!",
                success: false,
            });
        }

        if (email === "admin@me.com" && password === "123") {
            const Token = await jwt.sign({ data: email }, "GigaLuxe");
            let AdminToken = Token.split(".")[1];
            return res.status(200).json({
                message: "Admin is Login",
                AdminToken,
                success: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: true,
        });
    }
};