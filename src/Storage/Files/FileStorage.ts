import * as fs from "fs";
import * as mime from "mime-types";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {fileExtensionList} from "@src/Media/List/FileList";
import Record from "@src/Media/Record/Record";
import {getApiConfig} from "@src/config";

export default class FileStorage {
    static basePath:string = `${getApiConfig().basepath}`;
    //static destination:string;


    public storageName:string = "Files";

    constructor(name:string="Files") {
        this.storageName = name;
    }

    public static filename(originFile:any) {
        return originFile.originalname;
    }

    public static createPathIfNotExist(path:string) {
        //Create folder structure if doesn't exist
        if(!fs.existsSync(path))
            fs.mkdirSync(path, { recursive : true });
    }

    public static generateFilename(values:Array<string>, extension:string, sep:string="-") {
        return `${values.join(sep)}.${extension}`.replace(/\s/g, '');
    }

    //Remove character pass the last dot "." (don't use if you don't know if there is an extension)
    public static removeExtension(filenameWithExt:string) {
        const nameSplit = filenameWithExt.split(".");
        if (nameSplit.length > 1)
            nameSplit.pop(); //Remove extension
        return nameSplit.join("");
    }

    /**
     * Check if file is supported in a list of file extension
     * Used in FileFilter of multer to validate if the file is supported.
     * @param file
     * @param callback
     */
    public static isFileTypeSupportedFilter(file:any, callback:any) {

        const extension:string|false = mime.extension(file.mimetype);

        if (extension !== false) {
            const fileTypeIsSupported:boolean = FileStorage.fileTypeSupported(fileExtensionList, extension);
            return callback(
                (fileTypeIsSupported ? null : new Error('Error: file extension not accepted')),
                fileTypeIsSupported
            );
        }

        return callback(new Error('Error: file extension not accepted'), false);
    }

    public static fileTypeSupported(supportedExtensionsList:Array<any>, fileExtension:string):boolean {
        return supportedExtensionsList.includes(fileExtension);
    }

    public static getUniquePrefix():string {
        return Math.round(Math.random() * 1E9).toString().substring(0, 6); //length 6 random number
    }

    /**
     * Generate the path for public local storage (mostly dynamics elements).
     * @param entityType {string}
     * @param entityId {string}
     * @param basePath {string} Added to avoid adding static value. that method should be integrate in another scope.
     */
    public static generatePath(entityType:string, entityId:string, basePath:string=FileStorage.basePath):string {
        return `${basePath}/${entityType}/${entityId}`;
        //FileStorage.basePath + '/' + entityType + '/' + entityId + '/';
    }

    public static async saveFile(record:Record):Promise<void> {
        
        //https://stackoverflow.com/questions/35673866/how-to-use-typescript-async-await-with-promise-in-node-js-fs-module
        //https://stackoverflow.com/questions/39880832/how-to-return-a-promise-when-writestream-finishes
        
        
        FileStorage.createPathIfNotExist(record.pathNoFilename);
        const writeStream = fs.createWriteStream(record.pathWithFilename);
        return new Promise((resolve, reject) =>{
            writeStream.on("ready", () => {
                writeStream.writable && writeStream.write(record.file_buffer);
                writeStream.close();
            });
            writeStream.on("error", (err) => {
                reject(err);
            });
            writeStream.on("close", () => {
                resolve();
            });
        });
    }

    public static async deleteFile(record:Record):Promise<void>{
        return new Promise( (resolve, reject) => {
            fs.unlink(record.pathWithFilename, (err) => {
                if (err){
                    LogHelper.error("Couldn't delete file at path : " + record.pathWithFilename);
                    reject();
                }
            });
            LogHelper.log(`Delete file at ${record.pathWithFilename}`);
            resolve();
        });
    }
}