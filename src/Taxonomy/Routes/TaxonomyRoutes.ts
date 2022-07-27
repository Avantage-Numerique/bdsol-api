import express from "express";
import {TaxonomyController} from "../Controllers/TaxonomyController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class TaxonomyRoutes extends AbstractRoute {
    controllerInstance: AbstractController = TaxonomyController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();
}

export {TaxonomyRoutes};