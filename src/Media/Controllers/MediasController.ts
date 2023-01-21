import AbstractController from "../../Abstract/Controller";
import MediasService from "../Services/MediasService";
import Media from "../Models/Media";
import {ControllerContract} from "../../Abstract/Contracts/ControllerContract";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {StatusCodes} from "http-status-codes";
import * as mime from "mime-types"

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

    public internalCreate(req:any, res:any){
        //TODO: Call media service with the creation of media linked to createdEntity
        const createData = {
            title: req.body.data.media.title ?? '',
            alt: req.body.data.media.alt ?? '',
            description: req.body.data.media.description ?? '',
            path : "to determine",
            licence: req.body.data.media.licence ?? 'Public Domain (CC0)',
            fileType: req.body.data.media.fileType,
            fileName: req.file.filename,
            extension: mime.extension(req.file.mimetype),
            entityId: res.serviceResponse.data._id,
            uploadedBy: req.userId,
            dbStatus: 'in use',
            status: {
                state: 'pending',
                requestedBy: req.userId,
                lastModifiedBy: req.userId,
                //message: ''
            }
        }
        return this.service.insert(createData);
    }

    public internalUpdateToArchived(toArchiveId:any){
        return this.service.update({ _id : toArchiveId, dbStatus:"archived"});

    }

}

export default MediasController;