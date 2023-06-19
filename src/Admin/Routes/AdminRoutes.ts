import express, {NextFunction, Request, Response} from "express";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import AbstractRoute from "@core/Route";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import AdminController from "@src/Admin/Controllers/AdminController";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

class AdminRoutes extends AbstractRoute {

    controllerInstance: any = AdminController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution: any = {
        all: []
    }

    defaultMiddlewaresDistribution: any = {
        all: []
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

        this.routerInstance.get('/', [
            this.dashboardHandler.bind(this),
            this.staticContentNotFound.bind(this),
            this.renderDefaultTemplate.bind(this),
        ]);

        this.routerInstance.get('/bd', [
            this.dashboardDockerManagement.bind(this),
            this.staticContentNotFound.bind(this),
            this.renderDefaultTemplate.bind(this),
        ]);

        this.routerInstance.get('/routes', [
            this.renderRoutesStructureHandler.bind(this),
            this.staticContentNotFound.bind(this),
            this.renderDefaultTemplate.bind(this),
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


    public async dashboardHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.serviceResponse = await this.controllerInstance.renderAdminDashboard();
        return next();
    }


    public async dashboardDockerManagement(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.serviceResponse = await this.controllerInstance.renderDockerManager();
        return next();
    }


    public async renderRoutesStructureHandler(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.serviceResponse = await this.controllerInstance.renderRoutesStructure();
        return next();
    }


    /**
     * Build up the response for the tempalte route, (only getDoc for now).
     * @param req {Request}
     * @param res {Response}
     * @protected
     */
    protected async renderDefaultTemplate(req: Request, res: Response): Promise<any> {
        const logger = new LogHelper(req);
        logger.log(`Response status ${StatusCodes.OK}, ${StatusCodes["OK"]}`);
        return res.status(StatusCodes.OK).send(res.serviceResponse);
    }

    public async staticContentNotFound(req: Request, res: Response, next: NextFunction): Promise<any> {

        if (res.serviceResponse === undefined || res.serviceResponse === null || res.serviceResponse === "") {
            res.serviceResponse = ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND);
        }
        return next();
    }
}

export {AdminRoutes};