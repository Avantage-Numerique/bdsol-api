import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ReferentialController from "../Controllers/ReferentialController";

import { refData } from "../data";

class ReferentialRoutes {
    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: ReferentialController = ReferentialController.getInstance();

    constructor() {
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
        this.routerInstance.get("/", [this.getRefIndexHandler.bind(this)]);
        this.routerInstance.get("/:entity", [this.getRefEntityHandler.bind(this)]);
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
    public async getRefIndexHandler(req: Request, res: Response): Promise<any> {
        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(refData);
        }

        res.set("Content-Type", "text/html");
        return res.status(StatusCodes.OK).send(await this.controllerInstance.referentialLayout());
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefEntityHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(refData.primary[params.entity]);
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.referentialSingleEntityLayout(params.entity));
    }
}
export default ReferentialRoutes;
