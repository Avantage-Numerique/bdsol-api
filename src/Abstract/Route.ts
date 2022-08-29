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
            this.createHandler.bind(this)
        ]);

        this.routerInstanceAuthentification.post('/update', [
            ...this.addMiddlewares("all"),
            //...this.addMiddlewares("createUpdate"),
            ...this.addMiddlewares("update"),
            this.updateHandler.bind(this)
        ]);

        this.routerInstanceAuthentification.post('/delete', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("delete"),
            this.deleteHandler.bind(this)
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
            this.searchHandler.bind(this)
        ]);

        this.routerInstance.post('/list', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("list"),
            this.listHandler.bind(this),
            this.routeSendResponse,
        ]);

        this.routerInstance.post('/getinfo', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getinfo"),
            this.getInfoHandler.bind(this)
        ]);

        //  Get

        this.routerInstance.get('/getdoc', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getdoc"),
            this.getDocumentationHandler.bind(this)
        ]);


        // sets routes in target domain's route.
        this.setupAdditionnalPublicRoutes(this.routerInstance);


        //  Get

        // Set the /:slug handler at the end of other route, to allow the routes sets in setupAdditionnalPublicRoutes to be 1 in priority.
        this.routerInstance.get('/:slug', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("bySlug"),
            this.bySlugHandler.bind(this),
            this.routeSendResponse,
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
     * @return {Promise<any>}
     */
    public async createHandler(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.create(req.body.data);
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        if(!response.error){
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, response, 'create');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`)
        }
        return res.status(response.code).send(response);
    }


    /**
     * UPDATE
     * Handle the update method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async updateHandler(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.update(req.body.data);
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        if(!response.error){
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, response, 'update');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`)
        }
        return res.status(response.code).send(response);
    }


    /**
     * SEARCH
     * Handle the search method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async searchHandler(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.search(req.body.data);
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        return res.status(response.code).send(response);
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
        LogHelper.info(`Entering ${req.originalUrl}`);
        res.serviceResponse = await this.controllerInstance.list(req.body.data);
        //LogHelper.log(`Route /list response : ${response.code}, ${StatusCodes[response.code]}`);
        return next();
        //return res.status(response.code).send(response);
    }


    /**
     * DELETE
     * Handle the delete method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async deleteHandler(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.delete(req.body.data);
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        if(!response.error) {
            const userHistoryCreated:boolean = await this.controllerInstance.createUserHistory(req, res, response, 'delete');
            LogHelper.log(`UserHistory response : ${userHistoryCreated ? "Created" : "Error"}`)
        }
        return res.status(response.code).send(response);
    }


    /**
     * GETINFO
     * Handle the getInfo method of the controller of the entity, passing the data to it
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getInfoHandler(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.getInfo(req.body.data);
        LogHelper.log(`Route /getinfo response : ${response.code}, ${StatusCodes[response.code]}`);
        return res.status(response.code).send(response);
    }


    /**
     * Uniform return the response of service method.
     * @param req {Request} The current request
     * @param res {Response} The curren response.
     */
    public async routeSendResponse(req: Request, res: Response): Promise<any> {
        LogHelper.info(req.originalUrl);
        return res.status(res.serviceResponse.code).send(res.serviceResponse);
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
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        return res.send(style+response);
    }


    /**
     * Route handler of /:slug for all the abstract one.
     * @param req
     * @param res
     */
    public async bySlugHandler(req: Request, res: Response): Promise<any> {

        const {slug} = req.params;
        const response:ApiResponseContract = await this.controllerInstance.get({slug:slug});

        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        return res.status(response.code).send(response);
    }


    /**
     * Route handler of /:slug for all the abstract one.
     * @param req
     * @param res
     */
    public async disabledRouteHandler(req: Request, res: Response): Promise<any> {

        LogHelper.log(`${req.originalUrl} response : ${ReasonPhrases.NOT_FOUND} ${StatusCodes.NOT_FOUND}`);
        const disabledResponse:ApiResponseContract = ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND);
        return res.status(disabledResponse.code).send(disabledResponse);
    }

}

export default AbstractRoute;