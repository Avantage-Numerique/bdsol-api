import multer from "multer";
import PublicStorage from "../../Storage/Files/PublicStorage";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PublicStorage.basePath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const uploadSingle = multer({ storage: storage });

export default uploadSingle;
