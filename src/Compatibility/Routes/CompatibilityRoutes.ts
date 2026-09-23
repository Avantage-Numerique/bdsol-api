import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import CompatibilityController from "@src/Compatibility/Controllers/CompatibilityController";
import { refData } from "@ref/Data/data";
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
        this.routerInstance.get("/", [this.getCompatibilityHandler.bind(this)]);
        this.routerInstance.get("/vocabularies/:entity", [this.getVocabulariesHandler.bind(this)]);
        this.routerInstance.get("/properties", [this.getPrimitiveHandler.bind(this)]);
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
        const { params } = req;

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
    public async getVocabulariesHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        const vocabulariesPageRoute = {
            url: this.baseUrl + req.url,
            name: "ReferentialVocabularies",
        } as PublicRoute;

        if ("json" in req.query) {
            res.set("Content-Type", "application/json");

            return res.status(StatusCodes.OK).send(this.findEntityByURL(params.entity.toLowerCase()));
        }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(
                await this.controllerInstance.referentialVocabulariesLayout(
                    params.entity.toLowerCase() ?? null,
                    vocabulariesPageRoute
                )
            );
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getPrimitiveHandler(req: Request, res: Response): Promise<any> {
        const { params } = req;

        const primitivePageRoute = {
            url: this.baseUrl + req.url,
            name: "ReferentialPrimitive",
        } as PublicRoute;

        // TODO: clarifier le comportement en mode JSON
        // if ("json" in req.query) {
        //     res.set("Content-Type", "application/json");

        //     return res.status(StatusCodes.OK).send(this.findEntityByURL(params.type.toLowerCase()));
        // }

        res.set("Content-Type", "text/html");
        return res
            .status(StatusCodes.OK)
            .send(await this.controllerInstance.referentialPrimitivesLayout(primitivePageRoute));
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getCompatibleEntityHandler(req: Request, res: Response): Promise<any> {
        // TODO

        const { params } = req;

        const compatibileEntityPageRoute = {
            url: this.baseUrl + req.url,
            name: "CompatibilityOntologyEntity",
        } as PublicRoute;

        // if ("json" in req.query) {
        //     res.set("Content-Type", "application/json");

        //     return res.status(StatusCodes.OK).send(this.findEntityByURL(params.entity.toLowerCase()));
        // }

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
