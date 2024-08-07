import AbstractController from "../../Abstract/Controller";
import MediasService from "../Services/MediasService";
import Media from "../Models/Media";
import Record from "../Record/Record";
import {Request, Response} from "express";
import FileStorage from "@src/Storage/Files/FileStorage";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import Person from "@src/Persons/Models/Person";
import Organisation from "@src/Organisations/Models/Organisation";
import Project from "@src/Projects/Models/Project";
import Place from "@src/Places/Models/Place";
import Event from "@src/Events/Models/Event";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import Equipment from "@src/Equipment/Models/Equipment";

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
                mediaField: record.mediaField,
                entityId: record.entityId ?? '',
                entityType: record.entityType ?? '',
                uploadedBy: record.userId,
                dbStatus: 'in use',
                meta: {
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

    public internalDelete(entityId:any, filenameNoExt:string):any {
        return this.service.findAndDelete({ entityId: entityId, fileName: filenameNoExt });
    }

    public checkRequestData(req:Request):boolean{
        const requestData = req.body.data;

        //Check if data contains entityId, mediaField and entityType
        if(requestData.entityId == undefined ||
            requestData.mediaField === undefined ||
            requestData.entityType === undefined) {
                return false;
        }
        //Create keys (modelName) and values (accepted media field) for each model
        const entities:any = {
            [Person.getInstance().modelName]: ["mainImage"],
            [Organisation.getInstance().modelName]: ["mainImage"],
            [Project.getInstance().modelName]: ["mainImage"],
            [Event.getInstance().modelName]: ["mainImage", "photoGallery"],
            [Place.getInstance().modelName]: ["mainImage"],
            [Equipment.getInstance().modelName]: ["mainImage"]
        };
        //For all keys (modelName) check if image is accepted
        if(!Object.keys(entities).includes(requestData.entityType))
            return false;
        //For all values, check if mediaField is accepted for that model
        if(!entities[requestData.entityType].includes(requestData.mediaField))
            return false
        return true;//this could be change for a
    }

    public async saveFile(res: Response, record:Record):Promise<boolean>{
        //Save file
        await FileStorage.saveFile(record).then(function() {
            LogHelper.log("Saved file");
        }).catch(function (){
            LogHelper.log("It catched that the saveFile didn't work!");
            res.serviceResponse.multer.error = true;
            res.serviceResponse.multer.message = "Couldn't save file to the server :( , saving file failed"
            return false;
        });
        return true
    }

    //Insert media and delete file if failed
    public async insertMedia(res:Response, record:Record){
        const mediaResponse = await this.internalCreateFromRecord(record);
        res.serviceResponse = mediaResponse;
        if (mediaResponse.error){
            res.serviceResponse.failMessage = "Couldn't save file, creating media failed"

            //Delete file
            FileStorage.deleteFile(record);
            
            res.serviceResponse.multer = {};
            res.serviceResponse.multer.error = true;
            res.serviceResponse.multer.message = "Deleted file";
            return false;
        }
        return mediaResponse.data._id
    }

    public async linkEntityToMedia(res:Response, record:Record, toLinkMediaId:any){
        const updateRequest = { id: record.entityId, [record.mediaField] : toLinkMediaId };
        let linkingMediaResponse;
        const controller = EntityControllerFactory.getControllerFromEntity(record.entityType);
        if(controller !== undefined)
            linkingMediaResponse = await controller.update(updateRequest);
        
        if (linkingMediaResponse !== undefined && linkingMediaResponse.error){
            //Delete media
            res.serviceResponse = await this.internalDelete(record.entityId, record.filenameNoExt);
            res.serviceResponse.failMessage = "Couldn't save file, failed to link media to entity";
            //Delete file
            FileStorage.deleteFile(record);

            res.serviceResponse.multer = {};
            res.serviceResponse.multer.error = true;
            res.serviceResponse.multer.message = "Deleted file";
            return false;
        }
        return true;
    }

    public async archiveOldMedia(res:Response, toArchiveId:any){
        res.serviceResponse.oldMedia = await this.service.update({ _id : toArchiveId, dbStatus:"archived"});
        if (!res.serviceResponse.oldMedia.error)
            res.serviceResponse.oldMedia.message = "old media meta set to archived successfully"
        else
            res.serviceResponse.oldMedia.message = "old media meta update to archived failed"
    }


}

export default MediasController;