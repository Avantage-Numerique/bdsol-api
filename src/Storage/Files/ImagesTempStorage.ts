import multer from "multer";
import FileSupportedFilter from "../Filters/FileSupportedFilter";
import {fileExtensionList} from "../../Media/List/FileList";

class ImagesTempStorage {

    static _instance: ImagesTempStorage;

    constructor() {

    }

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {ImagesTempStorage} singleton instance of the constructor
     */
    static getInstance(): ImagesTempStorage {
        if (ImagesTempStorage._instance === undefined) {
            ImagesTempStorage._instance = new ImagesTempStorage();
        }
        return ImagesTempStorage._instance;
    }

    /**
     * @static get the middleware directly from the singleton instance.
     * @return {multer.Multer}
     */
    static middleware():multer.Multer {
        const storage:ImagesTempStorage = ImagesTempStorage.getInstance();
        return storage.middleware();
    }

    /**
     *
     */
    public middleware():multer.Multer {
        return multer({
            storage: multer.memoryStorage(),
            fileFilter: FileSupportedFilter.middleware(fileExtensionList)
        });
    }
}