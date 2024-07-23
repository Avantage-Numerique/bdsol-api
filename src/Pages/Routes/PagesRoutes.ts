import express, {Request, Response} from "express";
import AbstractRoute from "@core/Route";
import {StatusCodes} from "http-status-codes";
import PagesController from "@src/Pages/Controllers/PagesController";

class PagesRoutes extends AbstractRoute {

    controllerInstance: any = PagesController.getInstance();
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

        this.routerInstance.get('/versions', [
            this.versionsLayoutHandler.bind(this)
        ]);
        this.routerInstance.get('/statistics', [
            this.statisticsLayoutHandler.bind(this)
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


    public async statisticsLayoutHandler(req: Request, res: Response): Promise<any> {
        return this.layoutHandler(await this.controllerInstance.statistics(), req, res);
    }

    public async versionsLayoutHandler(req: Request, res: Response): Promise<any> {
        return this.layoutHandler(await this.controllerInstance.versions(), req, res);
    }


    public async layoutHandler(renderedLayout:any, req: Request, res: Response): Promise<any> {
        res.set('Content-Type', 'text/html');
        return res.status(StatusCodes.OK).send(renderedLayout);
    }

}

export {PagesRoutes};