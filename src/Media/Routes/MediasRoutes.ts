import express, {NextFunction, Request, Response} from "express";
import AbstractRoute from "@core/Route";
import EntityControllerFactory from "@core/EntityControllerFactory";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import * as fs from "fs";
import {StatusCodes} from "http-status-codes";
import FileStorage from "@src/Storage/Files/FileStorage";
import MediasController from "@src/Media/Controllers/MediasController";
import Record from "@src/Media/Record/Record";
import PublicLocalMediaStorage from "../Storage/PublicLocalMediaStorage";
import multer from "multer";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import PublicStorage from "@src/Storage/Files/PublicStorage";
import * as path from "path";
import {now} from "@src/Helpers/DateTime";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import {noHtmlStringSanitizerAlias} from "@src/Security/SanitizerAliases/NoHtmlStringSanitizerAlias";
import {isInEnumSanitizerAlias} from "@src/Security/SanitizerAliases/IsInEnumSanitizerAlias";
import {EntityTypesEnum} from "@src/Entities/EntityTypes";


class MediasRoutes extends AbstractRoute {

    controllerInstance:any = MediasController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    public multipartSetup:PublicLocalMediaStorage;

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [
            noHtmlStringSanitizerAlias('data.title'),
            noHtmlStringSanitizerAlias('data.alt'),
            noHtmlStringSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityId'),
            isInEnumSanitizerAlias('data.entityType', EntityTypesEnum),
        ],
        update: [
            objectIdSanitizerAlias('data.id', false),
            noHtmlStringSanitizerAlias('data.title'),
            noHtmlStringSanitizerAlias('data.alt'),
            noHtmlStringSanitizerAlias('data.description'),
            objectIdSanitizerAlias('data.entityId'),
            isInEnumSanitizerAlias('data.entityType', EntityTypesEnum),
        ],
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

        this.routerInstanceAuthentification.post('/upload', [
            multipartMiddlewareTemporaryHandler.fields([
                { name: 'mainImage', maxCount: 1 },
                { name: 'photoGallery', maxCount: 1 }
              ]),
            this.contentTypeParser.bind(this),
            ...this.addMiddlewares("all"),
            this.createOrUpdateDispatch.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/update', [
            multipartMiddlewareTemporaryHandler.fields([
                { name: 'mainImage', maxCount: 1 },
                { name: 'photoGallery', maxCount: 1 }
              ]),
            this.contentTypeParser.bind(this),
            ...this.addMiddlewares("all"),
            this.createOrUpdateDispatch.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.get('/delete/:entity/:id/:fileName', [
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
        if(req.files !== undefined){
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
        const isReqDataCorrect = this.controllerInstance.checkRequestData(req);
        if(!isReqDataCorrect){
            //Insert message missing field here
            res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST,
                "Required field : entityId : (the entityId of the entity media belongs to), "+
                "mediaField : ('mainImage', ...), "+
                "entityType: (type of entity 'Person', 'Organisation' ...)");
            return;
        }

        const {entityId, mediaField, entityType} = req.body.data;
        //Get old media ID if exist
        const controller = EntityControllerFactory.getControllerFromEntity(entityType);
        let entityResponse;
        if(controller !== undefined)
            entityResponse = await controller.search( { id : entityId } );

        const oldMediaId = entityResponse?.data?.[mediaField]?._id;
    
        const record = new Record(req.body.data, req.files, req.user._id, entityId, mediaField, entityType);
        if (!record.isValid()){
            res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Couldn't create Record associated with the file that was sent" );
            return;
        }
    
        //Save file
        const isFileSaved = await this.controllerInstance.saveFile(res, record);
        if(!isFileSaved)
            return;

        //Insert new media object in db and handle error (delete file if fail)
        const toLinkMediaId = await this.controllerInstance.insertMedia(res, record);
        //toLinkMediaId is false if failed
        if(toLinkMediaId === false)
            return;

        const isLinkedSuccess = await this.controllerInstance.linkEntityToMedia(res, record, toLinkMediaId)
        if(!isLinkedSuccess)
            return;

        //If entity had old media then update it
        if (oldMediaId !== undefined){
            await this.controllerInstance.archiveOldMedia(res, oldMediaId)
        }

        //Everything succeeded
        res.serviceResponse.message = "Success to save file, create media, and link media to entity!";
        res.serviceResponse.action = "create";
        const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res);
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

        const lowerEntity:string = req.params.entity.toLowerCase();
        //delete file
        // Assuming that 'path/file.txt' is a regular file.
        fs.unlink(`./localStorage/public/${lowerEntity}/${req.params.id}/${req.params.fileName}`, (err) => {
            if (err)
                LogHelper.error("Deleting file failed : ", err);
            else
                LogHelper.log(`./localStorage/public/${lowerEntity}/${req.params.id}/${req.params.fileName} was deleted`);
        });

        const mediaController = MediasController.getInstance();
        const entityController = EntityControllerFactory.getControllerFromEntity(req.params.entity);
        const filenameNoExt = FileStorage.removeExtension(req.params.fileName);

        //delete media from fileName && entityId (params.id)
        res.serviceResponse = await mediaController.internalDelete(req.params.id, filenameNoExt);

        //if entity media was in use => need to update entity media to null
        //NOTE : IF WE HAVE AN ENTITY WITH MULTIPLE MEDIA FIELD, THIS APPROACH DOESN'T WORK (because multiple media could be "in use")
        if(res.serviceResponse.data.dbStatus == "in use" && entityController !== undefined){
            res.serviceResponse.update = await entityController.service.update( { id: req.params.id, mainImage: null } );
        }

        return next();
    }

    /**
     * Route handler to get and view media
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async viewMedia(req: Request, res: Response, next: NextFunction): Promise<any> {
        const options:any = {
            //Removed this root option and added path.resolve to the return work with targetMediaPath
            //root: config.basepath,
            dotfiles: "deny",
            headers: {
                'x-timestamp': now(),
                'x-sent': true
            }
        };
        const {
            entity, id, fileName
        } = req.params;
        //type('image/jpeg')
        const lowerEntity:string = entity.toLowerCase();
        const targetMediaPath = path.resolve(path.join(`${PublicStorage.basePath}/${lowerEntity}/${id}/${fileName}`));
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