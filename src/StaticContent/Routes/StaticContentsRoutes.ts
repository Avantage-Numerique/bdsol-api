import express, {NextFunction, Request, Response} from "express";
import StaticContentsController from "../Controllers/StaticContentsController";
import {param} from "express-validator";
import AbstractRoute from "../../Abstract/Route";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";

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
        bySlug: [
            param('slug')
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim()
        ],
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
}

export {StaticContentsRoutes};