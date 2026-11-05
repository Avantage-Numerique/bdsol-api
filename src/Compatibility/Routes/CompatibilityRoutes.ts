import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import CompatibilityController from "@src/Compatibility/Controllers/CompatibilityController";
import { PublicRoute } from "@src/Pages/Types/PublicRoute";
import { ontologiesMetaData } from "../CompatibilityObject";

class CompatibilityRoutes {
    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: CompatibilityController = CompatibilityController.getInstance();

    public baseUrl: string;

    constructor() {
        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
        this.baseUrl = "/compatibility";
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        this.routerInstance.get("/", [this.getCompatibilityHandler.bind(this)]);
        this.routerInstance.get("/:entity", [this.getCompatibleEntityHandler.bind(this)]);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router {
        return this.routerInstance;
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getCompatibilityHandler(req: Request, res: Response): Promise<any> {
        const compatibilityPageRoute = {
            url: this.baseUrl + req.url,
            name: "Compatibility",
        } as PublicRoute;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");
            return res.status(StatusCodes.OK).send({ ontologiesMetaData });
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.compatibilityLayout(compatibilityPageRoute));
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getCompatibleEntityHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        const compatibileEntityPageRoute = {
            url: this.baseUrl + req.url,
            name: "CompatibilityOntologyEntity",
        } as PublicRoute;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res
                .status(StatusCodes.OK)
                .send(this.controllerInstance.getEntityRawData(params.entity.toLowerCase()));
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(
                await this.controllerInstance.compatibleEntityLayout(
                    params.entity.toLowerCase(),
                    compatibileEntityPageRoute
                )
            );
    }
}
export default CompatibilityRoutes;
