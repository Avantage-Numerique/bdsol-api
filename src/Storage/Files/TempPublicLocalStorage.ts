import PublicLocalStorage from "./PublicLocalStorage";
import multer from "multer";
import FileStorage from "./FileStorage";

export default class TempPublicLocalStorage extends PublicLocalStorage {

    static _instance:TempPublicLocalStorage;

    //  STATIC

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {TempPublicLocalStorage} Controller singleton constructor
     */
    static getInstance():TempPublicLocalStorage {
        if (TempPublicLocalStorage._instance === undefined) {
            TempPublicLocalStorage._instance = new TempPublicLocalStorage();
        }
        return TempPublicLocalStorage._instance;
    }

    /**
     * @static get the middleware directly from the singleton instance.
     * @param path
     */
    static middleware():any {
        const storage:TempPublicLocalStorage = TempPublicLocalStorage.getInstance();
        return storage.middleware();
    }


    public fileFilter():any {
        return (req:any, file:any, cb:any) => {
            FileStorage.isFileTypeSupportedFilter(file, cb)
        }
    }

    public middleware():any {
        return multer({
            storage: multer.memoryStorage()
            //fileFilter: this.fileFilter(), ?
        });
    }

}