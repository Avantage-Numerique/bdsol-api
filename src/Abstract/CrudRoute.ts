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
import e from "express";


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

        this.routerInstanceAuthentification.post('/create', [
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
     * CREATE
     * Handle the create method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async createHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const logger = new LogHelper(req);
        res.serviceResponse = await this.controllerInstance.create(req.body.data);

        //If person registered into database (success of creating entity) proceed
        if (res.serviceResponse.error) {
            return next();
        }
        else {
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'create');
            logger.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        

            //#File Validation and Upload
            //https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/

            //if file attached?
            if(true){
                //if entity have media field
                //TODO : Need to make a check for this
                if(true) {
                    //catch entity id and other info
                    const createdEntityId = res.serviceResponse.data._id;//No sure if it's data
                    //Here we gotta take note of the old media ID and make sure to eventually change it's dbStatus if the new media replace it (since it's create, shouldn't happen but still taking notes.)

                    //decide which param to keep(path, fileName, the field the media should be attached to...) and create a multer uploader based on that
                    const mediaStorage:PublicLocalMediaStorage = new PublicLocalMediaStorage();
                    const multerParams = multer({
                        storage: mediaStorage.storage("temp/123456789123456789123456/"),
                        //PublicLocalMediaStorage.limit;
                        //limits: mediaStorage.limits,
                        fileFilter: mediaStorage.fileFilter(),
                    });

                    //upload with multer
                    const upload = multerParams.single("mainImage"); //upload with multer

                    upload(req, res, function(err) {
                        // req.file contains information of uploaded file
                        // req.body contains information of text fields, if there were any
                
                        if (false){//req.fileValidationError) {
                            return res.send(req)//.fileValidationError);
                        }
                        else if (!req.file || !req.files) {
                            LogHelper.log("No files to save during /create of entity");
                            return next()
                        }
                        else if (err instanceof multer.MulterError) {
                            res.serviceResponse.media.error = err;
                            return next()
                        }
                        else if (err) {
                            res.serviceResponse.media.error = err;
                            return next();
                        }
                        // Display uploaded image for user validation
                        //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);

                    });

                    const mediasController = MediasController.getInstance();
                    //insert a new object media inside the database with all the information required
                    const mediaResponse = await mediasController.internalCreate(req, res);
                    
                    if (mediaResponse.error){
                        //Fill error
                        res.serviceResponse.media = mediaResponse;
                        res.serviceResponse.media.failMessage = "File uploaded and saved, but couldn't save media to database"
                        return next();
                    }
                    else {
                        const toLinkMediaId = mediaResponse.data._id;
                        const updateRequest =
                        {
                            _id: createdEntityId,
                            mainImage : toLinkMediaId,
                        }
                        const linkingMediaResponse = await this.controllerInstance.update(updateRequest)
                        if (linkingMediaResponse.error){
                            res.serviceResponse.media = mediaResponse;
                            res.serviceResponse.media.failMessage = "Couldn't link entity with the new media";
                            return next()
                        }
                        else{
                            //const oldMedia = res.serviceResponse.data.mainImage;
                            //if(oldMedia === undefined || oldMedia == ''){
                                res.serviceResponse.media.error = false;
                                res.serviceResponse.media.message = "Success to save file, create media, and link media to entity!"
                                return next()
                            }
                            //else{
                            //
                            //   return next()
                            //}
                    }
                }
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