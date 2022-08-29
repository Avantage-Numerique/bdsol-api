import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import express, {NextFunction} from "express";
import {Response, Request} from "express";
import AbstractController from "./Controller";
import {RouteContract} from "./Contracts/RouteContract";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes} from "http-status-codes";

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
            this.listHandler.bind(this),
            ...this.addMiddlewares("list"),
            this.routeSendResponse,
        ]);
        this.routerInstance.post('/getinfo', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getinfo"),
            this.getInfoHandler.bind(this)
        ]);
        this.routerInstance.get('/getdoc', [
            ...this.addMiddlewares("all"),
            ...this.addMiddlewares("getdoc"),
            this.getDoc.bind(this)
        ]);

        return this.setupAdditionnalPublicRoutes(this.routerInstance);
    }

    public setupAdditionnalPublicRoutes(router:express.Router):express.Router {
        return router;
    }


    //  Middlewares

    public addMiddlewares(route:string, middlewares:string = ""):Array<any> {
        //trying this : https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
        //const property:string = "middlewares" + middlewares+"Distribution";
        //const middlewaresArrayName = property as keyof this;
        //const middle:Array<any> = this[middlewaresArrayName];
        //return middle[route];
        return this.middlewaresDistribution[route] ?? [];
    }

    public defaultRequestSanitization(route:string):Array<any> {

        return this.middlewaresDistribution[route] ?? [];
    }


    //  Route's handlers

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
     * GETDOC
     * Handle the documentation method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getDoc(req: Request, res: Response): Promise<any> {
        const response:ApiResponseContract = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>';
        LogHelper.log(`${req.originalUrl} response : ${response.code}, ${StatusCodes[response.code]}`);
        return res.send(style+response);
    }


    public async routeSendResponse(req: Request, res: Response): Promise<any> {
        LogHelper.info(req.originalUrl);
        return res.status(res.serviceResponse.code).send(res.serviceResponse);
    }
}

export default AbstractRoute;