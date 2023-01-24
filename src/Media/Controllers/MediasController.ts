import AbstractController from "../../Abstract/Controller";
import MediasService from "../Services/MediasService";
import Media from "../Models/Media";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {StatusCodes} from "http-status-codes";
import * as mime from "mime-types"
import LogHelper from "../../Monitoring/Helpers/LogHelper";

class MediasController extends AbstractController { //implements ControllerContract {

    /** @private @static Singleton instance */
    private static _instance:MediasController;

    /** @public PersonsService */
    service:MediasService;

    /** @public Model */
    entity:Media;

    name:string = "Medias";

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

    public internalCreate(mediaData:any, file:any, path:string, fileName:string, userId:any, entityId:any){
        LogHelper.debug("Media internal Create");
        //TODO: Call media service with the creation of media linked to createdEntity
        const createData = {
            title: mediaData.title ?? '',
            alt: mediaData.alt ?? '',
            description: mediaData.description ?? '',
            path : path ?? 'undefined path',
            licence: mediaData.licence ?? 'Public Domain (CC0)',
            fileType: file?.fileType ?? 'image',
            fileName: fileName ?? "filenameNotSet",
            extension: file?.mimetype ? mime.extension(file?.mimetype) : "image/png",
            entityId: entityId ?? '',
            uploadedBy: userId,
            dbStatus: 'in use',
            status: {
                state: 'pending',
                requestedBy: userId,
                lastModifiedBy: userId,
                //message: ''
            }
        }
        LogHelper.debug("Media internal Create createData", createData);
        return this.service.insert(createData);
    }

    public internalUpdateToArchived(toArchiveId:any){
        return this.service.update({ _id : toArchiveId, dbStatus:"archived"});

    }

}

export default MediasController;