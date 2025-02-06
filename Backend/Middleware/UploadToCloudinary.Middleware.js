import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        console.log(result);

        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw error;
    }
};

const deleteLocalFile = (filePath) => {
    try {
        console.log(filePath);

        fs.unlinkSync(filePath); // Delete file from local storage
    } catch (error) {
        console.error('Local File Delete Error:', error);
    }
};

export const uploadToCloudinaryMiddleware = async (req, res, next) => {
    try {
        console.log(req.body.scrollBarImages);
        console.log(req.files['mainImage']?.[0]);

        const mainImage = req.files['mainImage']?.[0];
        const scrollBarImages = req.files['scrollBarImages'] || []; 

        if (mainImage) {
            req.body.mainRoomImage = await uploadToCloudinary(mainImage.path, 'Rooms');
            deleteLocalFile(mainImage.path);
        }

        req.body.roomImages = [];
        for (const image of scrollBarImages) {
            const imageUrl = await uploadToCloudinary(image.path, 'Rooms');
            req.body.roomImages.push(imageUrl);
            deleteLocalFile(image.path);
        }

        next();
    } catch (error) {
        console.error('Middleware Error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload images",
            error,
        });
    }
};
