import express, {NextFunction, Request, Response} from "express";
import MediasController from "../Controllers/MediasController";
import AbstractRoute from "../../Abstract/Route";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import * as fs from "fs";
import { StatusCodes } from "http-status-codes";
import FileStorage from "../../Storage/Files/FileStorage";
import EntityControllerFactory from "../../Abstract/EntityControllerFactory";
import Record from "../../Media/Record/Record";
import PublicLocalMediaStorage from "../Storage/PublicLocalMediaStorage";
import multer from "multer";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import PublicStorage from "../../Storage/Files/PublicStorage";
import * as path from "path";
import Organisation from "../../Organisations/Models/Organisation";
import Person from "../../Persons/Models/Person";
import config from "../../config";

class MediasRoutes extends AbstractRoute {

    controllerInstance:any = MediasController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    public multipartSetup:PublicLocalMediaStorage;

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }

    /**
     * The default middlewares for targeted route.
     * @abstract
     */
    defaultMiddlewaresDistribution: any = {
        all: [],
        create: [],
        createUpdate: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
        bySlug: []
    };

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        
        // sets routes in target domain's route.
        this.setupAdditionnalPublicRoutes(this.routerInstance);

        this.routerInstance.get('/:entity/:id/:fileName', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("bySlug"),
            this.viewMedia.bind(this)
        ]);

        this.routerInstance.get('/data/:id', [
            ...this.addMiddlewares("all"),
            this.getMediaData.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.routerInstance;
    }

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes(): express.Router {

        //MainImage limit and setup for memory Storage.
        this.multipartSetup = new PublicLocalMediaStorage();
        const multipartMiddlewareTemporaryHandler = multer({
            storage: multer.memoryStorage(),
            limits: this.multipartSetup.limits,
            fileFilter: this.multipartSetup.fileFilter(),
        });

        this.routerInstance.post('/upload', [
            multipartMiddlewareTemporaryHandler.single("mainImage"),
            this.contentTypeParser,
            ...this.addMiddlewares("all"),
            this.createOrUpdateDispatch.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/update', [
            multipartMiddlewareTemporaryHandler.single("mainImage"),
            this.contentTypeParser,
            ...this.addMiddlewares("all"),
            this.createOrUpdateDispatch.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.get('/delete/:entity/:id/:fileName', [
            ...this.addMiddlewares("all"),
            this.deleteHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.setupAdditionnalAuthRoutes(this.routerInstanceAuthentification);
    }


    public setupAdditionnalAuthRoutes(router: express.Router):express.Router {
        return router;
    }


    public setupAdditionnalPublicRoutes(router: express.Router):express.Router {
        return router;
    }


    public async createOrUpdateDispatch(req: Request, res: Response, next: NextFunction): Promise<any> {
        
        //If file attached (either upload or update)
        if(req.file !== undefined){
            await this.createAndReplaceHandler(req, res);
        }
        //if no file attached
        else {
            if(req.url == "/upload"){
                res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "File not received");
            }
            //if url /update and no file
            else {
                await this.updateHandler(req, res);
            }
        }
        return next();
    }


    public async createAndReplaceHandler(req: Request, res: Response): Promise<any> {
        res.serviceResponse = {};

        /*const createMediaResponse = await createMedia();
        const saveFileResponse = await saveFile();
        const linkEntityResponse = await linkEntity();

        if(!createMediaResponse || !saveFileResponse || !linkEntityResponse){
            createMediaResponse && deleteMedia();
            saveFileResponse && deleteFile();
            linkEntityResponse && unlinkEntity();
        }*/
        
        //Check if entityId, mediaField, entityType is in the request;
        const requestData = req.body.data;
        const { entityId, mediaField, entityType } = requestData;
        
        
        if(requestData.entityId == undefined ||
            requestData.mediaField === undefined ||
            requestData.entityType === undefined) {
                //Insert message missing field here
                res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST,
                    "Required field : entityId : (the entityId of the entity media belongs to), "+
                    "mediaField : ('mainImage', ...), "+
                    "entityType: (type of entity 'person', 'organisation' ...)");
                    return;
        }
                
        //if entity have media field
        //TODO : Need to make a check for this (this goes with making the create check for multiple field multer.single ("mainImage, and others..."))
        //Temporary check (entityType is person or org and mediaField is mainImage)
        const entities:any = [Person.getInstance().modelName.toLowerCase(), Organisation.getInstance().modelName.toLowerCase()];
        if( entities.includes(entityType)
            &&  mediaField == "mainImage" ) {
                
            //Get old media ID if exist
            const entityResponse = await EntityControllerFactory.getControllerFromEntity(entityType).search( { id : entityId } );
            const oldMediaId = entityResponse?.data?.[mediaField]?._id;
        
            const record = new Record(req, res, entityId, mediaField, entityType);
            if (!record.isValid()){
                res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Couldn't create Record associated with the file that was sent" );
                return;
            }
        
            //Save file
            await FileStorage.saveFile(record).then(function() {
                LogHelper.log("Saved file");
            }).catch(function (){
                LogHelper.log("It catched that the saveFile didn't work!");
                res.serviceResponse.multer.error = true;
                res.serviceResponse.multer.message = "Couldn't save file to the server :( , saving file failed"
                return;
           });
        
            const mediasController = MediasController.getInstance();
            //insert a new object media inside the database with all the information required
            const mediaResponse = await mediasController.internalCreateFromRecord(record);
            res.serviceResponse = mediaResponse;
            if (mediaResponse.error){
                res.serviceResponse.failMessage = "Couldn't save file, creating media failed"
    
                //Delete file
                FileStorage.deleteFile(record);
                
                res.serviceResponse.multer = {};
                res.serviceResponse.multer.error = true;
                res.serviceResponse.multer.message = "Deleted file";
                return;
            }

            const toLinkMediaId = mediaResponse.data._id;
            const updateRequest = { id: entityId, mainImage : toLinkMediaId };
            const linkingMediaResponse = await EntityControllerFactory.getControllerFromEntity(entityType).update(updateRequest);
            
            if (linkingMediaResponse.error){
                //Delete media
                res.serviceResponse = await mediasController.internalDelete(record.entityId, record.filenameNoExt);
                res.serviceResponse.failMessage = "Couldn't save file, failed to link media to entity";
                //Delete file
                FileStorage.deleteFile(record);

                res.serviceResponse.multer = {};
                res.serviceResponse.multer.error = true;
                res.serviceResponse.multer.message = "Deleted file";
                return;
            }

            //If entity had old media then update it
            if (oldMediaId !== undefined){
                res.serviceResponse.oldMedia = await this.controllerInstance.update( { id: oldMediaId, dbStatus: "archived" });
                if (!res.serviceResponse.oldMedia.error)
                    res.serviceResponse.oldMedia.message = "old media status set to archived successfully"
                else
                    res.serviceResponse.oldMedia.message = "old media status update to archived failed"
            }

            //Everything succeeded
            res.serviceResponse.message = "Success to save file, create media, and link media to entity!"
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'create');
            LogHelper.debug(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
            return;

        }

        //Return msg no field to put image into entity
        res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Entity mediaField is invalid");
        return;
    }

    public async updateHandler(req: Request, res: Response): Promise<any> {
        //No file attached
        const requestData = req.body.data;
        const updateData:any = { id: requestData.id };
        const modifiableFields = [ "title", "alt", "description", "licence" ] //User can only modify those fields
        Object.entries(requestData).forEach( ([key, value]) => {
            if (modifiableFields.includes(key)){
                updateData[key] = value;
            }
        });

        res.serviceResponse = await this.controllerInstance.service.update(updateData);
        return;
    }

    public async deleteHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        //`/${req.params.entity}/${req.params.id}/${req.params.fileName}`

        //delete file
        // Assuming that 'path/file.txt' is a regular file.
        fs.unlink(`./localStorage/public/${req.params.entity}/${req.params.id}/${req.params.fileName}`, (err) => {
            if (err)
                LogHelper.error("Deleting file failed : ", err);
            else
                LogHelper.log(`./localStorage/public/${req.params.entity}/${req.params.id}/${req.params.fileName} was deleted`);
        });

        const mediaController = MediasController.getInstance();
        const entityController = EntityControllerFactory.getControllerFromEntity(req.params.entity);
        const filenameNoExt = FileStorage.removeExtension(req.params.fileName);

        //delete media from fileName && entityId (params.id)
        res.serviceResponse = await mediaController.internalDelete(req.params.id, filenameNoExt);

        //if entity media was in use => need to update entity media to null
        //NOTE : IF WE HAVE AN ENTITY WITH MULTIPLE MEDIA FIELD, THIS APPROACH DOESN'T WORK (because multiple media could be "in use")
        if(res.serviceResponse.data.dbStatus == "in use")
            res.serviceResponse.update = await entityController.service.update( { id: req.params.id, mainImage: null } );

        return next();
    }

    /**
     * Route handler to get and view media
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async viewMedia(req: Request, res: Response, next: NextFunction): Promise<any> {
        const options = {
            root: config.basepath,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        const {
            entity, id, fileName
        } = req.params;

        //type('image/jpeg')
        const targetMediaPath = path.join(`${PublicStorage.basePath}/${entity}/${id}/${fileName}`);

        LogHelper.debug("Media view request", options, "path", targetMediaPath);

        await res.sendFile(
            targetMediaPath,
            options,
        (error) => {
                if (error){
                    //res.serviceResponse.code = StatusCodes.NOT_FOUND;
                    //res.serviceResponse.error = true;
                    //res.serviceResponse.data = error;
                    //next(error);
                    //res.status(404).send(new ApiResponse({ error: true, code: StatusCodes.NOT_FOUND, message: "File not found", errors: [], data: {} }).response)

                    LogHelper.info("Media : NOT_FOUND", error);
                    res.status(StatusCodes.NOT_FOUND);//do not use send, it return a : can't send header another time error.
                    res.end();
                }
                else {
                    res.end();
                }
            }
        );
    }


    public async getMediaData(req: Request, res: Response, next: NextFunction):Promise<any> {
        res.serviceResponse = await this.controllerInstance.get({_id:req.params.id});
        return next();
    }


}
export {MediasRoutes};