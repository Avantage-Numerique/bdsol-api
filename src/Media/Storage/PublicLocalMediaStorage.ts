import PublicStorage from "../../Storage/Files/PublicStorage";
import multer from "multer";
import * as mime from "mime-types";
import FileStorage from "../../Storage/Files/FileStorage";

/**
 *
 */
export default class PublicLocalMediaStorage extends PublicStorage {

    public destination:string;

    public filenameRecipe:any;


    constructor(filenameRecipe:any={}) {
        super();
        this.filenameRecipe = filenameRecipe;
    }


    public limits:{fields:number, fieldNameSize:number, fieldSize:number, fileSize:number } = {
        fields: 1,
        fieldNameSize: 50, // TODO: Check if this size is enough
        fieldSize: 20000, //TODO: Check if this size is enough
        // TODO: Change this line after compression
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    };

    public storage(targetPath:string):any {
        const localDestination:string = `${PublicStorage.basePath}/${targetPath}`;

        return multer.diskStorage({
            destination: (req:any, file:any, cb) => {
                //Create folder structure if doesn't exist
                FileStorage.createPathIfNotExist(localDestination);
                cb(null, localDestination);
            },

            filename: (req:any, file, cb) => {

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
                    FileStorage.getUniquePrefix(),
                    originalname
                ], extension));
            }
        });
    }

    public fileFilter():any {
        return (req:any, file:any, cb:any) => {
            FileStorage.isFileTypeSupportedFilter(file, cb)
        }
    }


    public filename(filenameRecipe:any, sep:string="-"):string {

        let filename:string = "";
        for (let part of filenameRecipe) {
            filename += part + sep;
        }
        return filename;
        /*FileStorage.generateFilename([
            fieldname,
            userId,
            FileStorage.getUniquePrefix(),
            originalname
        ]*/
    }

}