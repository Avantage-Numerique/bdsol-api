import PublicLocalStorage from "../../Storage/Files/PublicLocalStorage";
import multer from "multer";
import * as mime from "mime-types";
import FileStorage from "../../Storage/Files/FileStorage";
import FileSupportedFilter from "../../Storage/Filters/FileSupportedFilter";
import {fileExtensionList} from "../List/FileList";
import {SingleLimits} from "../../Storage/limits";

/**
 *
 */
export default class PublicLocalMediaStorage extends PublicLocalStorage {

    public destination:string;
    public filenameRecipe:any;

    public path:string;
    protected _storageMiddleware:any;
    static _instance:PublicLocalMediaStorage;


    constructor(filenameRecipe:any={}) {
        super();
        this.filenameRecipe = filenameRecipe;
    }


    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {PublicLocalMediaStorage} Controller singleton constructor
     */
    static getInstance():PublicLocalMediaStorage {
        if (PublicLocalMediaStorage._instance === undefined) {
            PublicLocalMediaStorage._instance = new PublicLocalMediaStorage();
        }
        return PublicLocalMediaStorage._instance;
    }


    /**
     * @static get the middleware directly from the singleton instance.
     * @param path
     */
    static middleware(path:string):any {
        const storage:PublicLocalMediaStorage = PublicLocalMediaStorage.getInstance();
        return storage.middleware(path);
    }


    public storage(targetPath:string):any {
        const localDestination:string = `${PublicLocalStorage.basePath}/${targetPath}`;

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


    /**
     * Generate the filename
     * @param filenameRecipe {any} filename structure.
     * @param sep {string} the seperator for the filename.
     */
    public filename(filenameRecipe:any, sep:string="-"):string {
        this.filenameRecipe = filenameRecipe;
        let filename:string = "";
        for (const part of this.filenameRecipe) {
            filename += part + sep;
        }
        return filename;
    }


    /**
     * Return the multer middleware
     * @param path {string}
     */
    public middleware(path:string):any {
        if (!this._storageMiddleware && path !== this.path) {
            this.path = path;
            this._storageMiddleware = multer({
                storage: this.storage(path),
                limits: SingleLimits,
                fileFilter: FileSupportedFilter.middleware(fileExtensionList),
            });
        }
        return this._storageMiddleware;
    }
}