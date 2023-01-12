
import {Service} from "../../Database/DatabaseDomain";
import Media from "../Models/Media";

class MediasService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:MediasService;

    constructor(entity:Media) {
        super(entity);
    }

    /** @public @static Singleton constructor for PersonsService */
    public static getInstance(model:any):MediasService {
        if (MediasService._instance === undefined) {
            MediasService._instance = new MediasService(model);
        }
        return MediasService._instance;
    }
}
export default MediasService;