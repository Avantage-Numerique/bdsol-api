import multer from "multer";
import PublicStorage from "../../Storage/Files/PublicLocalStorage";
import * as fs from 'fs';
import { fileExtensionList } from "../List/FileList";
import * as mime from 'mime-types'
import FileStorage from "../../Storage/Files/FileStorage";
import PublicLocalMediaStorage from "../Storage/PublicLocalMediaStorage";

const mediaStorage:PublicLocalMediaStorage = new PublicLocalMediaStorage();

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
        const tryExt:string|false = mime.extension(file.mimetype);
        const extension:string = (tryExt !== false ? tryExt : "");

        //cb(null, `${fieldname}-${userId}-${uniqueSuffix}-${originalname}${extension != undefined ? '.' + extension : ""}`);
        cb(null, FileStorage.generateFilename([
            fieldname,
            userId,
            uniqueSuffix,
            originalname
        ], extension));
    }
});

const uploadSingle = multer({
    storage: mediaStorage.storage("temp/123456789123456789123456/"),
    //PublicLocalMediaStorage.limit;
    //limits: mediaStorage.limits,
    fileFilter: mediaStorage.fileFilter(),
});

export default uploadSingle;
