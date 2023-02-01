import {RouteContract} from "./Contracts/RouteContract";
import AbstractRoute from "./Route";
import express, {NextFunction, Request, Response} from "express";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {param} from "express-validator";
import {NoAccentSanitizer} from "../Security/Sanitizers/NoAccentSanitizer";
import {NoSpaceSanitizer} from "../Security/Sanitizers/NoSpaceSanitizer";
import AbstractController from "./Controller";
import multer from "multer";
import MediasController from "../Media/Controllers/MediasController";
import PublicLocalMediaStorage from "../Media/Storage/PublicLocalMediaStorage";
import FileStorage from "../Storage/Files/FileStorage";
import * as mime from "mime-types"
import Record from "../Media/Record/Record";


abstract class CrudRoute extends AbstractRoute implements RouteContract {

    /**
     * Controller of a specific entity.
     * @abstract
     */
    abstract controllerInstance: AbstractController;

    /**
     * Router for public route.
     * @abstract
     */
    abstract routerInstance: express.Router;

    /**
     * Router for the authentifiation route.
     * @abstract
     */
    abstract routerInstanceAuthentification: express.Router;

    /**
     * All he current routes middlewares to add into the routes.
     * @abstract
     */
    abstract middlewaresDistribution: any;


    public multipartSetup:PublicLocalMediaStorage;

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
        bySlug: [
            param('slug')
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim()
        ]
    };

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

        //create target entity with upload
        this.routerInstanceAuthentification.post('/create', [
            multipartMiddlewareTemporaryHandler.single("mainImage"),
            this.contentTypeParser,
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("create"),
            this.createHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/update', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("update"),
            this.updateHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/delete', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("delete"),
            this.deleteHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.setupAdditionnalAuthRoutes(this.routerInstanceAuthentification);
    }


    public setupAdditionnalAuthRoutes(router: express.Router):express.Router {
        return router;
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {

        this.routerInstance.post('/search', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("search"),
            this.searchHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/textsearch', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("search"),
            this.textSearchHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/list', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("list"),
            this.listHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/getinfo', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getinfo"),
            this.getInfoHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        //  Get

        this.routerInstance.get('/getdoc', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getdoc"),
            this.getDocumentationHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);


        this.routerInstance.get('/list', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("list"),
            this.listHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        // sets routes in target domain's route.
        this.setupAdditionnalPublicRoutes(this.routerInstance);


        //  Get

        // Set the /:slug handler at the end of other route, to allow the routes sets in setupAdditionnalPublicRoutes to be 1 in priority.
        this.routerInstance.get('/:slug', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("bySlug"),
            this.getByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.routerInstance;
    }

    public setupAdditionnalPublicRoutes(router: express.Router):express.Router {
        return router;
    }

    //  Routes' handlers


    /**
     * Parse the current request content type. And parse data if it's multipart.
     * inspire by : https://stackoverflow.com/questions/49784509/handle-multipart-formdata-application-json-and-text-plain-in-single-express-ha
     * @param req
     * @param res
     * @param next
     */
    public async contentTypeParser(req:Request, res:Response, next:NextFunction): Promise<any> {

        //quand on save le fichier en temp. Il est cleared à la fin de la equest est est passé en buffer dans le request.
        /**
         * cb(null, {
         *       buffer: data,
         *       size: data.length
         *     })
         * 1. donc on pourrait faire un temps au bebug, et save le buffer à la fin.
         * 2. check le fichier temps pour vider ensuite.
         */

        const contentType:any = req.get('content-type');
        if (contentType.includes('application/json')) {
            return next();
        }

        if (contentType.includes('multipart/form-data')) {
            req.body.data = JSON.parse(req.body.data);
            return next();
        }

        return next();
    }

    /**
     * CREATE
     * Handle the create method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async createHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.create(req.body.data);

        //If person registered into database (success of creating entity) proceed
        if (res.serviceResponse.error) {
            return next();
        }
        else {
            if(req.file !== undefined){
                //if entity have media field
                //TODO : Need to make a check for this (this goes with making the create check for multiple field multer.single ("mainImage, and others..."))
                if(true) {
                    //Create media object in response
                    res.serviceResponse.media = {};
                    res.serviceResponse.multer = {};

                    //catch entity id and other info
                    const createdEntityId = res.serviceResponse.data._id;
                    const record = new Record(req, res, createdEntityId, "mainImage");
                    if (!record.isValid){
                        //Handle a response and return msg that something is wrong?
                    }

                    //Save file
                    await FileStorage.saveFile(record, req.file).then(function() {
                        LogHelper.log("Saved file");
                        
                    }).catch(function (){
                        res.serviceResponse.multer.error = true;
                        res.serviceResponse.multer.message = "Couldn't save file to the server :( , saving file failed"
                        return next();
                    });

                    const mediasController = MediasController.getInstance();
                    //insert a new object media inside the database with all the information required
                    const mediaResponse = await mediasController.internalCreateFromRecord(record);
                    res.serviceResponse.media = mediaResponse;
                    if (mediaResponse.error){
                        res.serviceResponse.media.failMessage = "Couldn't save file, creating media failed"

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
                    else {
                        const toLinkMediaId = mediaResponse.data._id;
                        const updateRequest =
                        {
                            id: createdEntityId,
                            mainImage : toLinkMediaId,
                        }
                        const linkingMediaResponse = await this.controllerInstance.update(updateRequest);
                        if (linkingMediaResponse.error){
                            res.serviceResponse.media.failMessage = "Couldn't save file, failed to link media to entity";
                            //Delete media
                            res.serviceResponse.media = await mediasController.internalDelete(record.entityId, record.filenameNoExt);
                            //Delete file
                            const fileDeleted = await FileStorage.deleteFile(record);
                            if (fileDeleted) {
                                res.serviceResponse.multer.error = true;
                                res.serviceResponse.multer.message = "Deleted file";
                            }
                            return next()
                        }
                        else
                        {
                            res.serviceResponse.media.message = "Success to save file, create media, and link media to entity!"
                            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'create');
                            LogHelper.debug(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
                            return next()
                        }
                    }
                }
            }
            else {
                return next();
            }
        }
    }


    /**
     * UPDATE
     * Handle the update method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async updateHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const logger = new LogHelper(req);
        res.serviceResponse = await this.controllerInstance.update(req.body.data);

        if (!res.serviceResponse.error) {
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'update');
            logger.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        }

        return next();
    }


    /**
     * DELETE
     * Handle the delete method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async deleteHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const logger = new LogHelper(req);
        res.serviceResponse = await this.controllerInstance.delete(req.body.data);

        if (!res.serviceResponse.error) {
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'delete');
            logger.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        }

        return next();
    }

    //  PUBLIC endpoints

    /**
     * SEARCH
     * Handle the search method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async searchHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.search(req.body.data);
        return next();
    }

    public async textSearchHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.textSearch(req.body.data);
        return next();
    }


    /**
     * LIST
     * Handle the list method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async listHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.list(req.body.data);
        return next();
    }

    /**
     * get LIST
     * Handle the list method for the get endpoint of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async getListHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.serviceResponse = await this.controllerInstance.list({});
        return next();
    }


    /**
     * GETINFO
     * Handle the getInfo method of the controller of the entity, passing the data to it
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async getInfoHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.getInfo(req.body.data);
        return next();
    }


    //  GET handlers

    /**
     * GETDOC
     * Handle the documentation method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getDocumentationHandler(req: Request, res: Response): Promise<any> {

        const response: ApiResponseContract = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>';
        return await this.defaultReturnTemplate(style + response, req, res);
    }


    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        // this may be overkill, because req.params already get all the same structure.
        const initialQuery: any = {};
        for (const param in req.params) {
            initialQuery[param] = req.params[param];
        }
        res.serviceResponse = await this.controllerInstance.get(initialQuery);
        return next();
    }


    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async listByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        // this may be overkill, because req.params already get all the same structure.
        const initialQuery: any = {};
        for (const param in req.params) {
            initialQuery[param] = req.params[param];
        }
        const data = req.body.data ?? {};

        const query:any = {...initialQuery, ...data}

        res.serviceResponse = await this.controllerInstance.list(query);
        return next();
    }

}

export default CrudRoute;