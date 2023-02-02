import * as fs from "fs";
import * as mime from "mime-types";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {fileExtensionList} from "../../Media/List/FileList";
import Record from "../../Media/Record/Record";

export default class FileStorage {
    static basePath:string;
    static destination:string;

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

    public static generatePath(entityType:string, entityId:string):string {
        return './localStorage/public/' + entityType + '/' + entityId;
        //FileStorage.basePath + '/' + entityType + '/' + entityId + '/';
    }

    public static async saveFile(record:Record, file:any) {
        
        //https://stackoverflow.com/questions/35673866/how-to-use-typescript-async-await-with-promise-in-node-js-fs-module
        //https://stackoverflow.com/questions/39880832/how-to-return-a-promise-when-writestream-finishes
        

        FileStorage.createPathIfNotExist(record.pathNoFilename);
        console.log("in saveFile");
        //return new Promise<void>( (resolve, reject) => {
            const writeStream = fs.createWriteStream(record.pathWithFilename);
            writeStream.on('ready', function() { writeStream.write(file.buffer);})
            writeStream.on('close', function() {
                writeStream.close(function(err) {
                    if(err)
                       LogHelper.error("FileStorage : ", err);
                    else
                       LogHelper.log("Success to save file");
                });
            });
            /*writeStream.on('error', function() {
                LogHelper.error("FileStorage failed to save file");
                reject();
            });
            writeStream.on('finish', function() {
                LogHelper.log("Success to save file");
                resolve();
            })*/
        //});
    }

    public static async deleteFile(record:Record):Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            fs.unlink(record.pathWithFilename, (err) => {
                if (err){
                    reject(false);
                }
                else {
                    LogHelper.log(`Delete file at ${record.pathWithFilename}`);
                    resolve(true);
                }
            });
        })
    }

}