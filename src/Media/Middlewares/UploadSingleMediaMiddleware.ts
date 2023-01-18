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
        const basePath = PublicStorage.basePath;
        const entityType:string = req.originalUrl.split("/")[1];
        const entityId:string = "123456789123456789123456"//req.entityId..?;
        const dest = `${basePath}/${entityType}/${entityId}`

        //Create folder structure if doesn't exist
        if(!fs.existsSync(dest))
            fs.mkdirSync(dest, { recursive : true });

        cb(null, dest);
    },
    filename: (req:any, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9).toString().substring(0, 6); //length 6 random number
        const userId = req.userId ?? 'undefined';
        const fieldname = file.fieldname;
        const originalname = file.originalname.toString().substring(0, 10);

        //If no extension is detected, it's set to undefined and not put in the fileName
        const extension = file.originalname.indexOf(".") != -1 ? file.originalname.toString().split(".").pop() : undefined;

        cb(null, `${fieldname}-${userId}-${uniqueSuffix}-${originalname}${extension != undefined ? '.' + extension : ""}`);
    }
});

const uploadSingle = multer({ storage: storage });

export default uploadSingle;
