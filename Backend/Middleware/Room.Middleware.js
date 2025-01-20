import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (!req.uploadFolder) {
   
            req.uploadFolder = path.join(__dirname, "../uploads", Date.now().toString());

            fs.mkdirSync(req.uploadFolder, { recursive: true });
        }

        cb(null, req.uploadFolder);
        console.log(req.uploadFolder);
        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});


const upload = multer({ storage });

export const uploadMiddleware = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'scrollBarImages', maxCount: 10 },
])

export default upload;
