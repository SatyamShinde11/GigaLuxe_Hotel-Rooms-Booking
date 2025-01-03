import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose
            .connect(process.env.MONGOOSE_URL)
            .then(() => {
                console.log("DB is connected ");
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};
export default connectDB