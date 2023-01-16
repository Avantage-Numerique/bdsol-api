import multer from "multer";
import PublicStorage from "../../Storage/Files/PublicStorage";
import * as fs from 'fs';
//https://stackoverflow.com/questions/27213418/node-js-and-multer-handle-the-destination-of-the-uploaded-file-in-callback-fun
const storage = multer.diskStorage({
    destination: (req:any, file:any, cb) => {
        //const manager = UploadManager.getInstance();
        //manager.prepareFile(record);
        //const record = new Record(req, file);
        //Définir le path
        //Get l'entité
        const entityType = req.originalUrl.split("/")[1];
        const dest = PublicStorage.basePath + "/" + entityType + "/" + "idBidon"

        //Create folder structure if doesn't exist
        if(!fs.existsSync(dest))
            fs.mkdirSync(dest, { recursive : true });
        cb(null, dest);
    },
    filename: (req:any, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + req.user._id + "-" + uniqueSuffix + "-" + file.originalname);
    }
});

const uploadSingle = multer({ storage: storage });

export default uploadSingle;
