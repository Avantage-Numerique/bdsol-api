import FileFilterMiddlewareContract from "../Contrats/FileFilterMiddlewareContract";
import multer, {FileFilterCallback} from "multer";
import * as mime from "mime-types";

export default class FileSupportedFilter implements FileFilterMiddlewareContract {

    static _instance: FileSupportedFilter;

    public req: Request;
    public file: Express.Multer.File;
    public callback: multer.FileFilterCallback;

    public supportedList:Array<any>;

    constructor(filetypes:Array<any>) {
        this.supportedList = filetypes;
    }

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {FileSupportedFilter} singleton instance of the constructor
     */
    static middleware(filetypes:Array<any>): any {
        if (FileSupportedFilter._instance === undefined) {
            FileSupportedFilter._instance = new FileSupportedFilter(filetypes);
        }
        return FileSupportedFilter._instance.middleware;
    }


    /**
     * Multer middleware, function used in Multer Options.
     * @param req
     * @param file
     * @param callback
     */
    public middleware(req:any, file:any, callback:any):FileFilterCallback {

        const extension:string|false = mime.extension(file.mimetype);

        if (extension !== false) {
            const fileTypeIsSupported:boolean = this.isFileTypeSupported(this.supportedList, extension);
            return callback(
                (fileTypeIsSupported ? null : new Error('Error: file extension not accepted')),
                fileTypeIsSupported
            );
        }
        return callback(new Error('Error: file extension not accepted'), false);
    }


    /**
     *
     * @param supportedExtensionsList {Array<any>} Array of extensions supported.
     * @param fileExtension
     */
    public isFileTypeSupported(supportedExtensionsList:Array<any>, fileExtension:string):boolean {
        return supportedExtensionsList.includes(fileExtension);
    }


    public challengeMimeType(file:any, callback:any){

    }

    public isExecutable(file:any, callback:any){

    }

}