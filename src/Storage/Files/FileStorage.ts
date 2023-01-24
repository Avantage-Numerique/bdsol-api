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

    public static createPathIfNotExist(path:string) {
        //Create folder structure if doesn't exist
        if(!fs.existsSync(path))
            fs.mkdirSync(path, { recursive : true });
    }

    public static generateFilename(values:Array<string>, extension:string, sep:string="-") {
        return `${values.join(sep)}.${extension}`;
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

    public static saveFile(entityType:string, entityId:string, mediaField:string, userId:string, file:any):void {
        const path = this.generatePath(entityType, entityId);
        const tryExt:string|false = mime.extension(file.mimetype);
        const extension:string = (tryExt !== false ? tryExt : "");

        const fileName = FileStorage.generateFilename(
            [
            mediaField,
            userId,
            FileStorage.getUniquePrefix(),
            file.originalname
            ],
            extension)
        
        FileStorage.createPathIfNotExist(path);

        LogHelper.debug(path, tryExt, extension, fileName);
        LogHelper.debug(path+'/'+fileName);

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

}