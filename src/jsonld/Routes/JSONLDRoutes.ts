import express, { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import JSONLDController from "@src/jsonld/Controllers/JSONLDController";

import { ErrorResponse } from "@src/Http/Responses/ErrorResponse";
import AbstractRoute from "@src/Abstract/Route";

class JSONLDRoutes extends AbstractRoute {
    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: JSONLDController = JSONLDController.getInstance();

    middlewaresDistribution = {};
    defaultMiddlewaresDistribution = {};
    public setupAdditionnalAuthRoutes(router: express.Router): express.Router {
        return router;
    }
    public setupAdditionnalPublicRoutes(router: express.Router): express.Router {
        return router;
    }

    constructor() {
        super();

        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        this.routerInstance.get("/:entity/:id", [
            this.getJsonLDEntityHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router {
        return this.routerInstance;
    }

    public async getJsonLDEntityHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { params } = req;

        let jsonldContent;

        try {
            jsonldContent = await this.controllerInstance.getJsonLDForEntity(params.entity, params.id);
        } catch (e) {
            console.error(e);

            res.serviceResponse = ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                String(e)
            );
            return next();
        }

        if (!jsonldContent) {
            res.serviceResponse = ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Entité introuvable!!!"
            );
            return next();
        } else {
            res.set("Content-Type", "application/json");
            return res.status(StatusCodes.OK).json(jsonldContent);
        }
    }
}
export default JSONLDRoutes;
