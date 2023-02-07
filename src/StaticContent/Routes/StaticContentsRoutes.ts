import express, {NextFunction, Request, Response} from "express";
import StaticContentsController from "../Controllers/StaticContentsController";
import AbstractRoute from "../../Abstract/Route";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

class StaticContentsRoutes extends AbstractRoute {

    controllerInstance: any = StaticContentsController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: [],
        bySlug: [],
    }

    defaultMiddlewaresDistribution: any = {
        all: [],
        bySlug: [],
    }


    // Initiator (called in api.ts)

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes(): express.Router {
        return this.routerInstanceAuthentification;
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
    public setupPublicRoutes():express.Router {

        this.routerInstance.get('/:slug/:secondSlug?', [
            this.getByTwoLevelUriParamsHandler.bind(this),
            this.staticContentNotFound.bind(this),
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


    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        if (req.params["slug"] === "licences") {
            res.serviceResponse = await this.controllerInstance.getLicencesContent();
        }

        return next();
    }

    /**
     * Route handler to transform all the URI params into query to the get
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    public async getByTwoLevelUriParamsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        if (req.params["slug"] === "licences") {
            res.serviceResponse = await this.controllerInstance.getLicencesContent();
        }

        if (req.params["slug"] === "licence" && req.params["secondSlug"] !== undefined) {
            res.serviceResponse = await this.controllerInstance.getTargetLicenceContent(req.params["secondSlug"]);
        }

        return next();
    }

    public async staticContentNotFound(req: Request, res: Response, next: NextFunction): Promise<any> {

        if (res.serviceResponse === undefined || res.serviceResponse === null || res.serviceResponse === "") {
            res.serviceResponse = ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND);
        }
        return next();

    }
}

export {StaticContentsRoutes};