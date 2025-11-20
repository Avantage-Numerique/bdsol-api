import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ReferentialController from "../Routes/ReferentialController";

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
        this.routerInstance.get("/", this.getRefHomeHandler);
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
    public async getRefHomeHandler(req: Request, res: Response): Promise<any> {
        if ("json" in req.query) {
            return res.status(StatusCodes.OK).send({
                Personnes: [{ "Titre 1": "https://api.avnu.ca/ref/person/bidon" }, { "Titre 2": "url/bidon.test2" }],
                Organisation: [{ "Titre 3": "url/bidon.test5" }, { "Titre 4": "url/bidon.test6" }],
                Project: "url/pas/bidon/pentoute.ca",
                Event: ["ici", "là", "plein", "de", "url"],
            });
        }
        //ToDo else return homepage of api with template
        return res.status(StatusCodes.OK).send("Todo");
    }
}
export default ReferentialRoutes;
