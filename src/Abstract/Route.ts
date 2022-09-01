import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import express, {NextFunction} from "express";
import {Response, Request} from "express";
import AbstractController from "./Controller";
import {RouteContract} from "./Contracts/RouteContract";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {param} from "express-validator";
import {NoSpaceSanitizer} from "../Security/Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../Security/Sanitizers/NoAccentSanitizer";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";

abstract class AbstractRoute implements RouteContract
{
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
    abstract middlewaresDistribution:any;


    /**
     * The default middlewares for targeted route.
     * @abstract
     */
    protected defaultMiddlewaresDistribution:any = {
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


    // Initiator (called in api.ts)

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes():express.Router {

        this.routerInstanceAuthentification.post('/create', [
            ...this.addMiddlewares("all"),
            //...this.addMiddlewares("createUpdate"),
            ...this.addMiddlewares("create"),
            this.createHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        this.routerInstanceAuthentification.post('/update', [
            ...this.addMiddlewares("all"),
            //...this.addMiddlewares("createUpdate"),
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

    public setupAdditionnalAuthRoutes(router:express.Router):express.Router {
        return router;
    }


    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes():express.Router {

        this.routerInstance.post('/search', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("search"),
            this.searchHandler.bind(this),
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


    /**
     * Allow routes Manager to declare route on the same router.
     * @param router {express.Router} The router to associate other routes, at the target Routes scope.
     */
    public setupAdditionnalPublicRoutes(router:express.Router):express.Router {
        return router;
    }


    //  Middlewares


    /**
     * Search for target route's middlewares
     * @param route {string}
     * @param middlewares {string}
     */
    public addMiddlewares(route:string, middlewares:string = ""):Array<any> {

        const defaultRoutes:any = this.defaultMiddlewaresDistribution[route] ?? [];
        const currentRouter:any = this.middlewaresDistribution[route] ?? [];

        return [...defaultRoutes, ...currentRouter];
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

        if(!res.serviceResponse.error){
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'create');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        }
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

        if(!res.serviceResponse.error){
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'update');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
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

        res.serviceResponse = await this.controllerInstance.delete(req.body.data);

        if(!res.serviceResponse.error){
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, res.serviceResponse, 'delete');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`);
        }

        return next();
    }


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


    /**
     * Uniform return the response of service method. Previous routes middlewares must require the next params to be able to end the chain by this.
     * @param req {Request} The current request
     * @param res {Response} The curren response.
     */
    public async routeSendResponse(req: Request, res: Response): Promise<any> {
        //LogHelper.info(req.originalUrl);
        return await this.defaultReturnResponseJson(res.serviceResponse, req, res);
        //return res.status(res.serviceResponse.code).send(res.serviceResponse);
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

        const response:ApiResponseContract = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>';
        return await this.defaultReturnTemplate(style+response, req, res);
    }


    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        // this may be overkill, because req.params already get all the same structure.
        let initialQuery:any = {};
        for (let param in req.params) {
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
        let initialQuery:any = {};
        for (let param in req.params) {
            initialQuery[param] = req.params[param];
        }
        res.serviceResponse = await this.controllerInstance.list(initialQuery);
        return next();
    }

    /**
     * Route handler to disable a route, that is define here, but shouldn't in an higher scope.
     * @param req
     * @param res
     */
    public async disabledRouteHandler(req: Request, res: Response): Promise<any> {
        return await this.defaultReturnResponseJson(
            ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND),
            req,
            res
        );
    }


    //  UTILS TO DRY THINGS

    /**
     * build up the response for all JSON response.
     * @param appResponse {ApiResponseContract}
     * @param req {Request}
     * @param res {Response}
     * @protected
     */
    protected async defaultReturnResponseJson(appResponse:ApiResponseContract, req: Request, res: Response): Promise<any> {

        this.logRoute(appResponse.code, req);
        return res.status(appResponse.code).send(appResponse);
    }


    /**
     * Build up the response for the tempalte route, (only getDoc for now).
     * @param appResponse {ApiResponseContract}
     * @param req {Request}
     * @param res {Response}
     * @protected
     */
    protected async defaultReturnTemplate(appResponse:any, req: Request, res: Response): Promise<any> {
        this.logRoute(StatusCodes.OK, req);
        return res.status(StatusCodes.OK).send(appResponse);
    }


    /**
     * Single place to standardized the route loggin here.
     * @param code {any} Should alway be an Int.
     * @param req {any} the request to trace some things setup in there.
     * @protected
     */
    protected logRoute(code:any, req:Request):void {

        LogHelper.log(`${req.originalUrl} response : ${code}, ${StatusCodes[code]}`);
    }


}

export default AbstractRoute;