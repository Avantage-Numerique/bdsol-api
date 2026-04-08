import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ReferentialController from "@ref/Controllers/ReferentialController";
import { refData } from "@ref/Data/data";

class ReferentialRoutes {
    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: ReferentialController = ReferentialController.getInstance();

    constructor() {
        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
    }

    private findEntityByURL(url: string) {
        return Object.values(refData)
            .flatMap((x) => Object.values(x).flat())
            .find((i) => `/${url}` === i.url?.toLowerCase());
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        this.routerInstance.get("/", [this.getRefIndexHandler.bind(this)]);
        this.routerInstance.get("/properties", [this.getRefPrimitiveHandler.bind(this)]);
        this.routerInstance.get("/vocabularies/:entity", [this.getRefVocabulariesHandler.bind(this)]);
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

            return res.status(StatusCodes.OK).send(this.findEntityByURL(params.entity.toLowerCase()));
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.referentialSingleEntityLayout(params.entity.toLowerCase()));
    }
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefVocabulariesHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(this.findEntityByURL(params.entity.toLowerCase()));
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.referentialVocabulariesLayout(params.entity.toLowerCase() ?? null));
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getRefPrimitiveHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        // TODO: clarifier le comportement en mode JSON
        // if ("json" in req.query) {
        //     res.set("Content-Type", "application/json");

        //     return res.status(StatusCodes.OK).send(findEntityByURL(params.type.toLowerCase()));
        // }

        res.set("Content-Type", "text/html");
        return res.status(StatusCodes.OK).send(await this.controllerInstance.referentialPrimitivesLayout());
    }
}
export default ReferentialRoutes;
