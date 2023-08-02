import AbstractController from "../../Abstract/Controller";
import MediasService from "../Services/MediasService";
import Media from "../Models/Media";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {StatusCodes} from "http-status-codes";
import Record from "../Record/Record";

class MediasController extends AbstractController { //implements ControllerContract {

    /** @private @static Singleton instance */
    private static _instance:MediasController;

    /** @public PersonsService */
    service:MediasService;

    /** @public Model */
    entity:Media;

    constructor() {
        super();
        this.entity = Media.getInstance();
        this.service = MediasService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {MediasController} Controller singleton constructor
     */
    public static getInstance():MediasController {
        if (MediasController._instance === undefined) {
            MediasController._instance = new MediasController();
        }
        return MediasController._instance;
    }

    public basepath(requestData:any) {
        return SuccessResponse.create({"basepath":"truetrue"}, StatusCodes.OK, "asdasdasd");
    }
    
    public uploadSingle(requestData:any) {
        return SuccessResponse.create({"uploadSingle":"truetrue"}, StatusCodes.OK, "Uploading single media comming into dev!");
    }

    public internalCreateFromRecord(record:Record){
        if(record.isValid()){
            const createData = {
                title: record.title,
                alt: record.alt,
                description: record.description,
                path : record.pathNoFilename,
                url: record.url,
                licence: record.licence,
                fileType: record.fileType,
                fileName: record.filenameNoExt,
                extension: record.extension,
                entityId: record.entityId ?? '',
                entityType: record.entityType ?? '',
                uploadedBy: record.userId,
                dbStatus: 'in use',
                status: {
                    state: 'pending',
                    requestedBy: record.userId,
                    lastModifiedBy: record.userId,
                    //message: ''
                }
            }
            return this.service.insert(createData);
        }
        return {error:true, data:{}};
    }

    public internalUpdateToArchived(toArchiveId:any){
        return this.service.update({ _id : toArchiveId, dbStatus:"archived"});
    }

    public internalDelete(entityId:any, filenameNoExt:string):any {
        return this.service.findAndDelete({ entityId: entityId, fileName: filenameNoExt });
    }
}

export default MediasController;