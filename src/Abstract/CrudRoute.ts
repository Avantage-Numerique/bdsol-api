import {RouteContract} from "./Contracts/RouteContract";
import AbstractRoute from "./Route";
import express, {NextFunction, Request, Response} from "express";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {param} from "express-validator";
import AbstractController from "./Controller";
import {Service} from "@database/Service";
import {urlSanitizerAlias} from "@src/Security/SanitizerAliases/UrlSanitizerAlias";
import {SlugSanitizer} from "@src/Security/Sanitizers/SlugSanitizer";


/**
 * The CrudRoute class is an abstract class that provides the basic functionality for CRUD (Create, Read, Update, Delete) operations on a specific entity.
 * It extends the AbstractRoute class and implements the RouteContract interface.
 *
 * @abstract
 * @class CrudRoute
 * @extends AbstractRoute
 * @implements RouteContract
 */
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
            urlSanitizerAlias('slug', false, param),
            param('slug')
                .customSanitizer(SlugSanitizer.validatorCustomSanitizer())
        ]
    };

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes(): express.Router {

        //create target entity with upload
        this.routerInstanceAuthentification.post('/create', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("create"),
            this.validatingResults.bind(this),
            this.createHandler.bind(this),
            this.createUserHistoryEntryHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/update', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("update"),
            this.validatingResults.bind(this),
            this.updateHandler.bind(this),
            this.createUserHistoryEntryHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/delete', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("delete"),
            this.validatingResults.bind(this),
            this.deleteHandler.bind(this),
            this.createUserHistoryEntryHandler.bind(this),
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
            this.validatingResults.bind(this),
            this.searchHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/textsearch', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("search"),
            this.validatingResults.bind(this),
            this.textSearchHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/list', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("list"),
            this.validatingResults.bind(this),
            this.listHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstance.post('/getinfo', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getinfo"),
            this.validatingResults.bind(this),
            this.getInfoHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        //  Get

        this.routerInstance.get('/getdoc', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getdoc"),
            this.validatingResults.bind(this),
            this.getDocumentationHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);


        this.routerInstance.get('/list', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("list"),
            this.validatingResults.bind(this),
            this.listHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);


        //  Get

        // Set the /:slug handler at the end of other route, to allow the routes sets in setupAdditionnalPublicRoutes to be 1 in priority.
        this.routerInstance.get('/:slug', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("bySlug"),
            this.validatingResults.bind(this),
            this.getByUriParamsHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.setupAdditionnalPublicRoutes(this.routerInstance);
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
        res.serviceResponse = await this.controllerInstance.create(req.body.data);
        res.serviceResponse.action = Service.CREATE_STATE;

        return next();
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
        res.serviceResponse = await this.controllerInstance.update(req.body.data);
        res.serviceResponse.action = Service.UPDATE_STATE;

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
        res.serviceResponse = await this.controllerInstance.delete(req.body.data);
        res.serviceResponse.action = Service.DELETE_STATE;

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

    public async countHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.serviceResponse = await this.controllerInstance.count(req.body.data);
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
        res.serviceResponse = await this.controllerInstance.single(initialQuery);
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

    public async createUserHistoryEntryHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        const logger = new LogHelper(req);
        if (!res.serviceResponse.error) {
            const userHistoryCreated: boolean = await this.controllerInstance.createUserHistory(req, res);
            logger.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        }
        logger.log(`Couldn't create userHistory, service response error : ${res.serviceResponse.message}, code ${res.serviceResponse.code}`);
        next();
    }

}

export default CrudRoute;