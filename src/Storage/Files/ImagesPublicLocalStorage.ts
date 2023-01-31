import PublicLocalStorage from "./PublicLocalStorage";
import multer from "multer";
import FileSupportedFilter from "../Filters/FileSupportedFilter";
import {fileExtensionList} from "../../Media/List/FileList";

export default class ImagesPublicLocalStorage extends PublicLocalStorage {

    static _instance:ImagesPublicLocalStorage;

    //  STATIC

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {TempPublicLocalStorage} Controller singleton constructor
     */
    static getInstance():ImagesPublicLocalStorage {
        if (ImagesPublicLocalStorage._instance === undefined) {
            ImagesPublicLocalStorage._instance = new ImagesPublicLocalStorage();
        }
        return ImagesPublicLocalStorage._instance;
    }


    /**
     * @static get the middleware directly from the singleton instance.
     * @return {multer.Multer}
     */
    static middleware():multer.Multer {
        const storage:ImagesPublicLocalStorage = ImagesPublicLocalStorage.getInstance();
        return storage.middleware();
    }


    public middleware():multer.Multer {
        return multer({
            storage: multer.memoryStorage(),
            fileFilter: FileSupportedFilter.middleware(fileExtensionList)
        });
    }

}