import * as fs from "fs";
import * as mime from "mime-types";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {fileExtensionList} from "../../Media/List/FileList";

export default class FileStorage {
    static basePath:string;
    static destination:string;

    public static filename(originFile:any) {
        return originFile.originalname;
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
        return './localStorage/public' + entityType + '/' + entityId;
        //FileStorage.basePath + '/' + entityType + '/' + entityId + '/';
    }



    //      FS function

    /**
     * Save buffer into a file in the target path.
     * @param path {string}
     * @param fileName {string}
     * @param file {any} This must be a multer file, got from the request.
     */
    public static saveFile(path:string, fileName:string, file:any):void {

        FileStorage.createPathIfNotExist(path);

        const writeStream = fs.createWriteStream(path+'/'+fileName);
        writeStream.on('ready', function() { writeStream.write(file.buffer);})
        writeStream.on('close', function() {
            writeStream.close(function(err) {
                if(err)
                    LogHelper.error("FileStorage : ", err);
                else
                    LogHelper.log("Success to save file");
            })
        })
    }

    /**
     * Create folder structure if doesn't exist
     * @param path {string} Create the path if it isn't already the case.
     */
    public static createPathIfNotExist(path:string) {
        if(!FileStorage.isPathExist(path))
            fs.mkdirSync(path, { recursive : true });
    }


    /**
     * Check if the path exist in it's own function.
     * @param path
     */
    public static isPathExist(path:string) {
        return fs.existsSync(path);
    }

    /**
     * Generate a file name from multiple element set in an Array
     * @param values {Array<string>} array of string that will be concatenate together with a sep.
     * @param extension {string}
     * @param sep {string}
     */
    public static generateFilename(values:Array<string>, extension:string, sep:string="-") {
        return `${values.join(sep)}.${extension}`;
    }

}