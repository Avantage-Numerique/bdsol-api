import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import express from "express";
import {Response, Request} from "express";
import AbstractController from "./Controller";
import {RouteContract} from "./Contracts/RouteContract";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
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
    abstract defaultMiddlewaresDistribution:any;


    // Initiator (called in api.ts)

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    abstract setupAuthRoutes():express.Router;


    abstract setupAdditionnalAuthRoutes(router:express.Router):express.Router;


    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    abstract setupPublicRoutes():express.Router;


    /**
     * Allow routes Manager to declare route on the same router.
     * @param router {express.Router} The router to associate other routes, at the target Routes scope.
     */
    abstract setupAdditionnalPublicRoutes(router:express.Router):express.Router;


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
     * Uniform return the response of service method. Previous routes middlewares must require the next params to be able to end the chain by this.
     * @param req {Request} The current request
     * @param res {Response} The curren response.
     */
    public async routeSendResponse(req: Request, res: Response): Promise<any> {
        return await this.defaultReturnResponseJson(res.serviceResponse, req, res);
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
        const logger = new LogHelper(req);
        logger.log(`Response status ${appResponse.code}, ${StatusCodes[appResponse.code]}`);
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
        const logger = new LogHelper(req);
        logger.log(`Response status ${StatusCodes.OK}, ${StatusCodes["OK"]}`);
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