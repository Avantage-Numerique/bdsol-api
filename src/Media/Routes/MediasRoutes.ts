import express, {NextFunction, request, Request, Response} from "express";
import MediasController from "../Controllers/MediasController";
import AbstractRoute from "../../Abstract/Route";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import * as fs from "fs";
import ApiResponse from "../../Http/Responses/ApiResponse";
import { StatusCodes } from "http-status-codes";
import FileStorage from "../../Storage/Files/FileStorage";
import EntityControllerFactory from "../../Abstract/EntityControllerFactory";
import * as mime from "mime-types"
import Record from "../../Media/Record/Record";
import PublicLocalMediaStorage from "../Storage/PublicLocalMediaStorage";
import multer from "multer";

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

        this.routerInstance.get('/', [
            ...this.addMiddlewares("all"),
            this.basepathHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.get('/delete/:entity/:id/:fileName', [
            ...this.addMiddlewares("all"),
            this.deleteHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        
        // sets routes in target domain's route.
        this.setupAdditionnalPublicRoutes(this.routerInstance);

        // Set the /:slug handler at the end of other route, to allow the routes sets in setupAdditionnalPublicRoutes to be 1 in priority.
        this.routerInstance.get('/:entity/:id/:fileName', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("bySlug"),
            this.getByUriParamsHandler.bind(this),
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

        this.multipartSetup = new PublicLocalMediaStorage();
        const multipartMiddlewareHandler = multer({
            storage: this.multipartSetup.storage("temp/123456789123456789123456/"),
            //PublicLocalMediaStorage.limit;
            //limits: mediaStorage.limits,
            fileFilter: this.multipartSetup.fileFilter(),
        });

        const multipartMiddlewareTemporaryHandler = multer({
            storage: multer.memoryStorage()
        });

        this.routerInstance.post('/', [
            ...this.addMiddlewares("all"),
            multipartMiddlewareHandler.single("mainImage"),
            this.uploadSingleHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/upload', [
            multipartMiddlewareTemporaryHandler.single("mainImage"),
            this.contentTypeParser,
            ...this.addMiddlewares("all"),
            this.createHandler.bind(this),
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

    /**
     * BasePath
     * Handle the list method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async uploadSingleHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        LogHelper.debug("uploadSingleHandler");
        // req.file is the name of your file in the form above, here 'uploaded_file'
        // req.body will hold the text fields, if there were any
        console.log(req.file, req.body);
        res.serviceResponse = await this.controllerInstance.uploadSingle(req.body.data);
        return next();
    }

    /**
     * BasePath
     * Handle the list method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async basepathHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        LogHelper.debug("basePathHandler");
        res.serviceResponse = await this.controllerInstance.basepath(req.body.data);
        return next();
    }


    public async createHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = {};
        LogHelper.log("Entered createHandler");
        //Received file?
        if(req.file == undefined){
            res.serviceResponse.code = 400;
            res.serviceResponse.message = "File not received."
            return next();
        }

        //if entity have media field
        //TODO : Need to make a check for this (this goes with making the create check for multiple field multer.single ("mainImage, and others..."))
        if(true) {

            //Check if entityId, mediaField, entityType is in the request;
            const requestData = req.body.data;
            const { entityId, mediaField, entityType } = requestData;

            if(requestData.entityId == undefined ||
                requestData.mediaField == undefined ||
                requestData.entityType == undefined) {
                //Insert message missing field here
                LogHelper.log("undefined necessary field");
                return next();
            }


            //Create object in response
            res.serviceResponse.multer = {};
        
            const record = new Record(req, res, entityId, mediaField, entityType);
            if (!record.isValid()){
                //Handle a response and return msg that something is wrong?
            }
        
            //Save file
            FileStorage.saveFile(record, req.file)//.then(function() {
                LogHelper.log("Saved file");
            //}).catch(function (){
                //res.serviceResponse.multer.error = true;
                //res.serviceResponse.multer.message = "Couldn't save file to the server :( , saving file failed"
               // return next();
           //});
        
            const mediasController = MediasController.getInstance();
            //insert a new object media inside the database with all the information required
            const mediaResponse = await mediasController.internalCreateFromRecord(record);
            res.serviceResponse = mediaResponse;
            if (mediaResponse.error){
                res.serviceResponse.failMessage = "Couldn't save file, creating media failed"
    
                //Delete file
                await FileStorage.deleteFile(record).then( function() {
                    LogHelper.warn("Deleted file because couldn't create media");
                }).catch(function() {
                    LogHelper.warn("Couldn't delete file although media failed to create");
                    res.serviceResponse.multer.error = true;
                    res.serviceResponse.multer.message = "Deleted file";
                    return next();
                });
            }

            const toLinkMediaId = mediaResponse.data._id;
            const updateRequest = { id: entityId, mainImage : toLinkMediaId };
            const linkingMediaResponse = await EntityControllerFactory.getControllerFromEntity(entityType).update(updateRequest);
            
            if (linkingMediaResponse.error){
                res.serviceResponse.failMessage = "Couldn't save file, failed to link media to entity";
                //Delete media
                res.serviceResponse = await mediasController.internalDelete(record.entityId, record.filenameNoExt);
                //Delete file
                const fileDeleted = await FileStorage.deleteFile(record);
                if (fileDeleted) {
                    res.serviceResponse.multer.error = true;
                    res.serviceResponse.multer.message = "Deleted file";
                }
                return next()
            }

            //Everything succeeded
            res.serviceResponse.message = "Success to save file, create media, and link media to entity!"
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'create');
            LogHelper.debug(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
            return next()

        }

        //Return msg no field to put image into entity

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

        //Modify the mediafield in entity
        const entityController = EntityControllerFactory.getControllerFromEntity(req.params.entity);
        res.serviceResponse = await entityController.service.update( { id: req.params.id, mainImage: null } )

        //delete media from fileName && entityId (params.id)
        const mediaController = MediasController.getInstance();
        res.serviceResponse.media = await mediaController.internalDelete(req.params.id, FileStorage.removeExtension(req.params.fileName));
        return next();
    }

    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const options = {
            root: "/api/localStorage/public",
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }

        res.status(200).sendFile(
        `/${req.params.entity}/${req.params.id}/${req.params.fileName}`,
        options,
        function (err) {
            if (err){
                LogHelper.error("MediasRoute:", err);
                res.status(404).send(new ApiResponse({ error: true, code: StatusCodes.NOT_FOUND, message: "File not found", errors: [], data: {} }).response)
            }
            else {
                LogHelper.log(`Sent file at : /${req.params.entity}/${req.params.id}/${req.params.fileName}`);
            }
        });
    }
}
export {MediasRoutes};