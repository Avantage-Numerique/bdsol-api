import FileFilterMiddlewareContract from "../Contrats/FileFilterMiddlewareContract";
import multer, {FileFilterCallback} from "multer";
import * as mime from "mime-types";
import {fileExtensionList} from "../../Media/List/FileList";

export default class FileSupportedFilter implements FileFilterMiddlewareContract {

    static _instance: FileSupportedFilter;

    public req: Request;
    public file: Express.Multer.File;
    public callback: multer.FileFilterCallback;

    constructor() {

    }

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {FileSupportedFilter} singleton instance of the constructor
     */
    static getMiddleware(): any {
        if (FileSupportedFilter._instance === undefined) {
            FileSupportedFilter._instance = new FileSupportedFilter();
        }
        return FileSupportedFilter._instance.middleware;
    }


    public middleware(req:any, file:any, callback:any):FileFilterCallback {
        //return FileStorage.isFileTypeSupportedFilter(file, callback);

        const extension:string|false = mime.extension(file.mimetype);

        if (extension !== false) {
            const fileTypeIsSupported:boolean = this.fileTypeSupported(fileExtensionList, extension);
            return callback(
                (fileTypeIsSupported ? null : new Error('Error: file extension not accepted')),
                fileTypeIsSupported
            );
        }

        return callback(new Error('Error: file extension not accepted'), false);
    }

    public fileTypeSupported(supportedExtensionsList:Array<any>, fileExtension:string):boolean {
        return supportedExtensionsList.includes(fileExtension);
    }

}