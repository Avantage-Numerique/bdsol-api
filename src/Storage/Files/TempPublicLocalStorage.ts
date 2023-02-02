import PublicLocalStorage from "./PublicLocalStorage";
import multer from "multer";
import FileSupportedFilter from "../Filters/FileSupportedFilter";

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
     * @return {multer.Multer}
     */
    static middleware():multer.Multer {
        const storage:TempPublicLocalStorage = TempPublicLocalStorage.getInstance();
        return storage.middleware();
    }


    /**
     * Instance method that return the multer
     */
    public middleware():multer.Multer {
        return multer({
            storage: multer.memoryStorage(),
            fileFilter: FileSupportedFilter.middleware([])
        });
    }

}